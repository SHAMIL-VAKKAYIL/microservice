const orderModel = require('../../models/order.model');
const client = require('../grpcProductClient');
const { promisify } = require('util')

const productsByIdAsync = promisify(client.productsById).bind(client);

const resolver = {
    Query: {
        orders: async () => {
            return await orderModel.find()
        },
        myOders: async (_, { }, { user }) => {
            if (!user) throw new Error("Authentication required");
            return await orderModel.find({ userId: user.id })
        },
        singleOrder: async (_, { id }) => {
            return await orderModel.findById(id)
        }

    },
    Mutation: {
        createOrder: async (_, { items }, { user }) => {

            const products = await Promise.all(
                items.map(async (item) => {
                    const data = await productsByIdAsync({ id: item.productId });
                    
                    if (!data) throw new Error('Product not found');

                    return {
                        productId: data.id,
                        name: data.name,
                        price: data.price,
                        quantity: item.quantity
                    };
                })
            );

            

            const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
console.log(totalPrice);

            const order = new orderModel({
                userId: user.id,
                products,
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