const express = require('express')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const authRouter=require('./routes/auth.routes')


dotenv.config()
const app = express()

connectDB()


app.use('/api/auth',authRouter)




app.listen(5001, () => {
    console.log('server is runnig on 5001');
    console.log('https://shamilvakkayil.com');
    
})