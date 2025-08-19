const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const paymentRoute = require('./routes/payment.route')

dotenv.config()

const app = express()
connectDB()
app.use(express.json())


app.use('/api/payment', paymentRoute)


app.listen(5002, () => {
    console.log('server is runnig on 5002');
})