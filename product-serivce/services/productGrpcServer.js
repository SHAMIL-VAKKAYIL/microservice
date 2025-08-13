import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'
import productModel from '../models/product.model'
import connectDB from '../config/db'

const packageDef = protoLoader.loadSync(path.join(__dirname, '../../protos/product.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const productProto = grpc.loadPackageDefinition(packageDef)
const productPackage = productProto.product

const server = new grpc.Server()

server.addService(productPackage.ProductService.service, {
    productsById: async (call, callback) => {
        const { id } = call.request
        const product = await productModel.findById(id);
        if (!product) return callback(new Error(`Product ${product?._id} not found`), null);

        const orderItem = {
            productId: product._id,
            name: product.name,
            price: product.price,
        }

        return callback(null, orderItem)

    }
})

    (async () => {
        try {
            await connectDB();
            server.bindAsync('0.0.0.0:50058', grpc.ServerCredentials.createInsecure(), () => {
                console.log("User gRPC server running on port 50058");
            })
        } catch (error) {
            console.error("Failed to connect DB in grpcServer:", error.message);

        }
    })()