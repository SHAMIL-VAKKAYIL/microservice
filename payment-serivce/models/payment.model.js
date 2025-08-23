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


paymentSchema.static.build = (attrs) => {
    if (!attrs.orderId || !attrs.stripeId) {
        throw new Error('Missing required fields for payment creation');
    }
    return new paymentModel(attrs);
}

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;