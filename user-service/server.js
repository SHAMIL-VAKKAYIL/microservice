const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()

app.use(express.json())


app.listen(5004, () => {
    console.log('server is runnig on 5004');
})