const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()
const connectDB = require('../config/db')
const orderModel = require('../models/order.model')


const packageDef = protoLoader.loadSync(path.join(__dirname, '../../protos/order.proto'), {})
const orderProto = grpc.loadPackageDefinition(packageDef)
const orderPackage = orderProto.order

const server = new grpc.Server();


server.addService(orderPackage.OrderService.service, {
    getOrderById: async (call, callback) => {
        const { id } = call.request

        const order = await orderModel.findById(id).select('total status')
        if (!order) { return callback(new Error(`Product ${id} not found`), null); }
        const orderResponse = {
            id: order._id,
            total: order.total,
            status: order.status
        }
        return callback(null, orderResponse)

    }
});

const grpcstart = async () => {
    try {
        await connectDB()
        server.bindAsync('0.0.0.0:50055', grpc.ServerCredentials.createInsecure(), () => {
            
        })
    } catch (error) {
        throw new Error('server error')
    }
}

grpcstart()

module.exports={grpcstart}
