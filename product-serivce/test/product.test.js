import request from 'supertest'
import express from 'express'
import path from 'path'
import dotenv from 'dotenv';

import productRouter from '../routes/product.routes.js'

//! In ES module we want use fileURLToPath to use __dirname
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()

const app = express();
app.use(express.json());

connectDB(); 

app.use('/api/product', productRouter);

//! get all product
describe('pruduct routes',()=>{
    it('should reutrn all product',async()=>{
        const res =await request(app).get('/api/product/getAllProduct')
      
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
    })
})


// ! add product
describe('POST /addProduct', () => {
  it('should add a product with images', async () => {
    const res = await request(app)
      .post('/api/product/addProduct')
      .field('name', 'Product3')
      .field('category','Dress')
      .field('description', 'A test dress 3')
      .field('price', 600)
      .field('size', 'L')
      .field('stocks', 23)
      .attach('images', path.join(__dirname, 'test11.png'))
      .attach('images', path.join(__dirname, 'test12.png'));
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Product added successfully');
  });
});

//! product by Id
// describe(' product by Id ',()=>{
//     let productId='688f3071162d49e3e54c3ddc'
//         it('get product by id',async()=>{
//             const res = await request(app).get(`/api/product/productById/${productId}`)
//             expect(res.statusCode).toBe(200)
//             expect(res.body).toHaveProperty('_id',productId)

//         })
// })

//! delete product by Id
// describe(' delete product by Id ',()=>{
//     let productId='688f3071162d49e3e54c3ddc'
//         it('get product by id',async()=>{
//             const res = await request(app).delete(`/api/product/deleteProduct/${productId}`)
//             expect(res.statusCode).toBe(200)
//             expect(res.body).toHaveProperty('_id',productId)

//         })
// })