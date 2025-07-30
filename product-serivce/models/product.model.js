const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size:{type:String,required:true},
    price: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String,default:'active', enum: ['active', 'inactive'] },
    stocks:{type:Number,min:0,required:true},
    images:[{
        url:String,
        alt:String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
