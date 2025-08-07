const request = require('supertest')
const express = require('express')

const dotenv = require('dotenv')
const connectDB = require('../config/db')
const userRouter = require('../routes/user.routes')
const cookieparser = require('cookie-parser')
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieparser())


connectDB()

app.use('/api/user', userRouter)

describe('get all users',()=>{
    it(' return all users',async()=>{
        const res = await request(app).get('/api/user/allUsers')
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
    })
})

// describe('update user', () => {
//     it('update user by id', async () => {
//         const res = await request(app).put('/api/user/updateProfile').send({username:"muhammed shamil",email:"msv@gmail.com"})

//         expect(res.statusCode).toBe(201)
//         expect(res.body).toBeInstanceOf(Object)
//     })
// })