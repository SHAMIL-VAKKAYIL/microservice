const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()
connectDB()






app.listen(5004, () => {
    console.log('server is runnig on 5004');
})