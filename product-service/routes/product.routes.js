import express from 'express'
import {addProduct, deleteProduct, getAllProduct, getSinlgeProduct,} from '../controllers/product.controller.js'
import multer from '../middlewares/multer.js'

const router =express.Router()

router.post('/addProduct', multer.array('images',5), addProduct)
router.get('/getAllProduct', getAllProduct)
router.get('/productById/:id', getSinlgeProduct)
router.delete('/deleteProduct/:id', deleteProduct)

export default router
