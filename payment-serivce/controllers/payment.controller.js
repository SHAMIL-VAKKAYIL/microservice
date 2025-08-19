const stripe = require("../config/stripe");
const paymentModel = require("../models/payment.model");
const client = require("../services/grpcOrderClient");

exports.paymentSecton = async (req, res) => {
    const { orderId } = req.body;

    try {

        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        let order = {}
        // orderstatus status checking logic can be added here 
        client.getOrderById({ id: orderId }, (err, data) => {
            if (err) {
                throw new Error(`Order ${orderId} not found`, null);
            }
            order = data
        })

        if (order.status === "Cancelled") {
            return res.status(400).json({ error: 'Order is cancelled' });
        }

        // Logic for creating a payment section
        const charge = await stripe.PaymentIntents.create({
            amount: order.total * 100,
            currency: 'aed',
            description: `Payment for order ${orderId}`,
            paymentmethod: 'pm_card_visa',
            confirm: true

        })

        const payment = paymentModel.build({
            orderId: orderId,
            stripeId: charge.id,
            status: charge.status,
        })
        await payment.save();

        return res.status(200).json({ success: true, charge, payment });

    } catch (error) {
        return res.status(500).json({ error: "Payment failed", details: err.message });
    }
}