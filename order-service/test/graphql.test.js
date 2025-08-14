const request = require('supertest')
const { startServer } = require('../server.js')

let app

beforeAll(async () => {
    app = await startServer()
})


// describe('orders ',()=>{
//     it('should get all orders', async () => {
//         const query = `
//         query {
//             orders {
//                 id
//                 products 
//                 totalPrice
//                 status
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
//                 products 
//                 totalPrice
//                 status
//             }
//         }`
//         const res = await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json')
//         console.log(res.body.data.myOders);
//         expect(res.statusCode).toBe(200);
//         expect(res.body.data.myOders).toBeDefined();
//     })
// })


// desctribe('single order', () => {
//     it('should get single order', async () => {
//         const query = `
//         query {
//             singleOrder(id: "order_123") {
//                 id
//                 products 
//                 totalPrice
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
                    { productId: "688f30f52a9d045caa6f50b9", quantity: 2 }
                    { productId: "6893681bd23b667f167df447", quantity: 1 }
                ]){
                    id
                    status
                    totalPrice
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
//         updateOrder(id: "order_123", status: "Shipped") {
//         id
//         products
//         status
//         totalPrice
//         }`

//         const res = await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json')
//         console.log(res.body.data.updateOrder);
//         expect(res.statusCode).toBe(200);
//     })
    
// })