const request = require('supertest')
const { startServer } = require('../server.js')

let app

beforeAll(async () => {
    app = await startServer()
})

describe('order graphql', () => {
    it('should create an order', async () => {
        const query = `
        mutation {
                createOrder(items: [
                    { productId: "prod_101", quantity: 2 }
                    { productId: "prod_202", quantity: 1 }
                ])
            }
        }`

        const res =await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json')
        console.log(res.body.data.createOrder);
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