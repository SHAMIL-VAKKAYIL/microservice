const express = require('express')
const dotenv = require('dotenv')
const cors =require('cors')

const connectDB = require('./config/db')
const paymentRoute = require('./routes/payment.route')

dotenv.config()

const app = express()
connectDB()

app.use(express.json())
// app.use(cors({
//     origin:'http://localhost:5005'
// }))

app.use('/api/payment', paymentRoute)


app.listen(5002, () => {
    console.log('server is runnig on 5002');
})