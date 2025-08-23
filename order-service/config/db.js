const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)   
    } catch (error) {
        throw new Error('server error')

    }
}
module.exports = connectDB