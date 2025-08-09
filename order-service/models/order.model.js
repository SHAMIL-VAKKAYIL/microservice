const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: String,
    price: Number,
    quantity: { type: Number, required: true }
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [orderItemSchema],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    }
},
    { timestamps: true }
);

export default mongoose.model("order", orderSchema)