const request = require('supertest')
const { startServer } = require('../server.js')
const {grpcstart} =require('../services/grpcOrderserver.js')

let app

beforeAll(async () => {
    await grpcstart()
    app = await startServer()
})


// describe('orders ',()=>{
//     it('should get all orders', async () => {
//         const query = `
//         query {
//             orders {
//                 id
//                 products{
//                     name
//                 }
//                 total
//                 status
//             }
//         }`
//         const res = await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json')
//         console.log(res.body.data.orders);
//         expect(res.statusCode).toBe(200);
//         expect(res.body.data.orders).toBeDefined();
//     })
// })


// describe('my orders', () => {
//     it('should get my orders', async () => {
//         const query = `
//         query {
//             myOders {
//                 id
//                 products{
//                 price
//                 }
//                 total
//                 status
//             }
//         }`
//         const res = await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json')
//         console.log(res.body.data.myOders);
//         expect(res.statusCode).toBe(200);
//         expect(res.body.data.myOders).toBeDefined();
//     })
// })


// describe('single order', () => {
//     it('should get single order', async () => {
//         const query = `
//         query {
//             singleOrder(id: "689f622a71b5ae5a1abc8578") {
//                 id
//                 products{
//                     name
//                     price
//                 }
//                 total
//                 status
//             }
//         }`

//         const res = await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json')
//         console.log(res.body.data.singleOrder);
//         expect(res.statusCode).toBe(200);
//         expect(res.body.data.singleOrder).toBeDefined();
//     })
// })

describe('order graphql', () => {
    it('should create an order', async () => {
        const query = `
        mutation {
                createOrder(items: [
                    { productId: "688f30f52a9d045caa6f50b9", quantity: 5 }
                    { productId: "6893681bd23b667f167df447", quantity: 2 }
                ]){
                    id
                    status
                    total
                }
        }`

        const res =await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json')
        console.log(res.body);
        expect(res.statusCode).toBe(200);
    })
})

// describe('order status update', () => {
//     it('should update order status', async()=>{
//         const query = `
//         mutation {
//             updateOrder(id: "689f622a71b5ae5a1abc8578", status: "Shipped") {
//                 id
//                 products{
//                     name
//                     price
//                 }
//                 status
//                 total
//             }
//         }`

//         const res = await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json')
//         console.log(res.body.data.updateOrder);
//         expect(res.statusCode).toBe(200);
//     })
    
// })