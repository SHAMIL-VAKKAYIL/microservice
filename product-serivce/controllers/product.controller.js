const productModel = require("../models/product.model")

exports.addProduct = async (req, res) => {
    const productData = req.body
    // const image = req.file.filename
    // const { name, description, price, stocks, size } = productData
    // try {
    //     const product = new productModel({ name, description, size, price, image, stocks })
    //     await product.save()
    //     res.status(201).json({ message: 'Product added successfully' })

    // } catch (error) {
    //     console.log(error);

    // }
}

exports.getAllProduct = async (req, res) => {
    try {
        const product = await productModel.find().sort({ _id: -1 })
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

exports.getSinlgeProduct = async (req, res) => {
    const { id: productId } = req.params
    try {
        const product = await productModel.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

exports.deleteProduct = async (req, res) => {
    const { id: productId } = req.params
    console.log(req.params);
    console.log(productId);

    try {
        const data = await productModel.findByIdAndDelete(productId)
        console.log(data);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}