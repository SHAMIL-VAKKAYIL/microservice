// import request from 'supertest'
// import { startServer } from '../server.js'



// let app;

// beforeAll(async () => {
//     app = await startServer()
// })

// describe('product filtering grapql', () => {

//     it('shoud return products by category', async () => {
//         const query = `
//         query{
//             products(filter:{minPrice:550}){
//             id
//             name
//             category
//             price
//             size
//             stocks
//            }
//         }`

//         const res = await request(app).post('/graphql').send({ query }).set('Content-Type', 'application/json');
//         expect(res.statusCode).toBe(200);
//         expect(res.body.data.products).toBeInstanceOf(Array);
//     })
// })