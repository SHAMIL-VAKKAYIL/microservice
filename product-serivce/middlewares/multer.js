import multer from 'multer'
import path from 'path'

//! temporary storage
const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('only images are allowed', false)
    }
}




export default multer({storage,fileFilter})