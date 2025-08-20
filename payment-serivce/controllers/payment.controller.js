const stripe = require("../config/stripe");
const paymentModel = require("../models/payment.model");
const client = require("../services/grpcOrderClient");


const getOrderByIdAsync = promisify(client.getOrderById).bind(client)

exports.paymentSecton = async (req, res) => {
    const { orderId } = req.body;

    try {

        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        // orderstatus status checking logic can be added here 
        
        const order = await getOrderByIdAsync({ id: orderId })

        console.log(order);
        
        // getOrderByIdAsync({ id: orderId }, (err, data) => {
        //     if (err) {
        //         throw new Error(`Order ${orderId} not found`, null);
        //     }
        //     order = data
        // })

        if (order.status === "Cancelled") {
            return res.status(400).json({ error: 'Order is cancelled' });
        }

        // Logic for creating a payment section

        const charge = await stripe.paymentIntents.create({
            amount: order.total * 100,
            currency: 'aed',
            description: `Payment for order ${orderId}`,
            payment_method: 'pm_card_visa',
            confirm: true

        })

        const payment = paymentModel.build({
            orderId: orderId,
            stripeId: charge.id,
            status: charge.status,
        })
        console.log(payment);
        
        await payment.save();

        return res.status(200).json({ success: true, charge, payment });

    } catch (error) {
        return res.status(500).json({ error: "Payment failed", details: error.message });
    }
}