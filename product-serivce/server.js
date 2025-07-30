const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRouter= require('./routes/product.routes')
dotenv.config()

const app = express()
connectDB()

app.use(express.json())
app.use(cors({
    origin:'http//:localhost:5173'
}))

app.use('/api/product',productRouter)



app.listen(5003, () => {
    console.log('server is runnig on 5003');
})