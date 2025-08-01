import productModel from "../models/product.model.js"
import cloudinary from '../utils/cloudinary.js'

export const addProduct = async (req, res) => {
    const productData = req.body

    const { name, description, price, stocks, size } = productData
    try {
        const imageArray=[]

        for(const file of req.files){
            const result = await cloudinary.uploader.upload(file.path)

            fs.unlinkSync(file.path) //! removing temp file after uploding ^

            imageArray.push({
                url:result.secure_url,
                alt:result.original_filename
            })

        }
        const product = new productModel({ name, description, size, price, images:imageArray, stocks })
        await product.save()
        res.status(201).json({ message: 'Product added successfully' })

    } catch (error) {
        console.log(error);

    }
}

export const getAllProduct = async (req, res) => {
    try {
        const product = await productModel.find().sort({ _id: -1 })
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

export const getSinlgeProduct = async (req, res) => {
    const { id: productId } = req.params
    try {
        const product = await productModel.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req, res) => {
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