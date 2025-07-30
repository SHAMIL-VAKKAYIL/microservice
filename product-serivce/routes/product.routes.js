const { addProduct, getAllProduct, getSinlgeProduct, deleteProduct } = require('../controllers/product.controller')

const router =require('express').Router()


router.post('/addProduct',addProduct)
router.get('/getAllProduct',getAllProduct)
router.get('/productById',getSinlgeProduct)
router.delete('/deleteProduct',deleteProduct)

module.exports=router
