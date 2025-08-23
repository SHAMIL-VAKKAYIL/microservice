const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
   {
        orderId: {
            type: String,
            required: true
        },
        stripeId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
)

const paymentModel = mongoose.model("payment", paymentSchema);

paymentModel.build = (attrs) => {
    if (!attrs.orderId || !attrs.stripeId) {
        throw new Error('Missing required fields for payment creation');
    }
    return new paymentModel(attrs);
}


module.exports = paymentModel;