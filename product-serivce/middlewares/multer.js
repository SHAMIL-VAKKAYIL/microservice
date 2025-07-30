const multer = require('multer')
const path = require('path')


//! temporary storage
const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('only images are allowed', false)
    }
}




module.exports=multer({storage,fileFilter})