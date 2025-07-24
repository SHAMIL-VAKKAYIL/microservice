const express = require('express')
const dotenv = require('dotenv')
const cors =require('cors')
const connectDB = require('./config/db')
const authRouter=require('./routes/auth.routes')


dotenv.config()
const app = express()

connectDB()

app.use(express.json())
app.use(cors({
    origin:'http//:localhost:5173'
}))

app.use('/api/auth',authRouter)




app.listen(5001, () => {
    console.log('server is runnig on 5001');
})