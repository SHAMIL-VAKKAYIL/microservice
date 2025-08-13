const orderModel = require('../../models/order.model');
const client = require('../grpcProductClient');


const resolver = {
    Query: {
        order: async () => {
            return await orderModel.find()
        },
        myOders: async (_, _, { user }) => {
            if (!user) throw new Error("Authentication required");
            return await orderModel.find({ userId: user.id })
        },
        singleOrder: async (_, { id }) => {
            return await orderModel.findById(id)
        }

    },
    Mutation: {
        createOrder: async (_, { items }, { user }) => {
            let orderItems = []
            let totalPrice

            for (let item of items) {
                client.productsById({ id: items.productId }, (err, data) => {
                    if (err) {
                        console.error("Error fetching product:", err);
                        return
                    }
                    const orderItem = {
                        productId: data.id,
                        name: data.name,
                        price: data.price,
                        quantity: item.quantity
                    }

                    orderItems.push(orderItem)
                    totalPrice += data.price * item.quantity

                })
            }
            const order = new orderModel({
                userId: user.id,
                products: orderItems,
                status: 'Pending',
                total: totalPrice,

            })
            await order.save()
            return order
        },
        updateOrder: async (_, { id, status }) => {
            const order = await orderModel.findById(id)
            if (!order) throw new Error("Order not found");

            order.status = status;
            await order.save()
            return order
        }

    }
}

module.exports = resolver