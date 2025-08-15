import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import dotenv from 'dotenv'

dotenv.config()

import productModel from '../models/product.model.js'
import connectDB from '../config/db.js'

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const packageDef = protoLoader.loadSync(path.join(__dirname, '../../protos/product.proto'),{})
const productProto = grpc.loadPackageDefinition(packageDef)
const productPackage = productProto.product

const server = new grpc.Server();


connectDB();

server.addService(productPackage.ProductService.service, {
  productsById: async (call, callback) => {
    const { id } = call.request;
    
    const product = await productModel.findById(id);
    if (!product) return callback(new Error(`Product ${id} not found`), null);

    const orderItem = {
      id: product._id,
      name: product.name,
      price: product.price,
    };

    console.log(orderItem);
    
    

    return callback(null, orderItem);
  }
});

    (async () => {

        try {
            server.bindAsync('0.0.0.0:50058', grpc.ServerCredentials.createInsecure(), () => {
                console.log("User gRPC server running on port 50058");
            })
        } catch (error) {
            console.error("Failed to connect DB in grpcServer:", error.message);

        }
    })()


