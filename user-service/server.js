const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRouter =require('./routes/user.routes')

dotenv.config()

const app = express()

app.use(express.json())
connectDB()

app.use('/api/user',userRouter)

app.listen(5004, () => {})