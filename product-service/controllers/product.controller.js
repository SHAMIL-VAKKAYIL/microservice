import productModel from "../models/product.model.js"
import cloudinary from '../utils/cloudinary.js'

import fs from 'fs'


export const addProduct = async (req, res) => {
    const productData = req.body

    const { name, description, price, stocks, size,category } = productData
    try {
        const imageArray = []

        for (const file of req.files) {
             const result = await cloudinary.uploader.upload(file.path)

            fs.unlinkSync(file.path) //! removing temp file after uploding ^

            //? for testing
            // imageArray.push({
            //     url: 'https://mocked.cloudinary.com/fake-image.jpg',
            //     alt: file.originalname
            // });

            imageArray.push({
                url: result.secure_url,
                alt: result.original_filename
            })

        }

        const product = new productModel({ name, description, size, price, images: imageArray, stocks ,category})
        await product.save()
        res.status(201).json({ message: 'Product added successfully' })


         //? for testing
        // for (const file of req.files) {
        //     fs.unlink(file.path, (err) => {
        //         if (err) console.error(`Failed to delete ${file.path}`, err);
        //     }); 
        // }

    } catch (error) {
        res.status(400).json({ err: 'faild to adding Product' })

    }
}

export const getAllProduct = async (req, res) => {
    try {
        const product = await productModel.find().sort({ _id: -1 })
        res.status(200).json(product)
    } catch (error) {
res.status(400).json({err:'faild to get all product'})
    }
}

export const getSinlgeProduct = async (req, res) => {
    const { id: productId } = req.params
    try {
        const product = await productModel.findById(productId)
        res.status(200).json(product)
    } catch (error) {
res.status(400).json({err:'faild to get single product'})
    }
}

export const deleteProduct = async (req, res) => {
    const { id: productId } = req.params
  

    try {
        const data = await productModel.findByIdAndDelete(productId)

        res.status(200).json(data)
    } catch (error) {
res.status(400).json({err:'faild to delete product'})
    }
}