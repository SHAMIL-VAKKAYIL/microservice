const grpc =require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path=require('path')


const packageDef = protoLoader.loadSync(path.join(__dirname, '../../protos/order.proto'), {})
const orderProto =grpc.loadPackageDefinition(packageDef)
const orderPackage=orderProto.order

const client =new orderPackage.OrderService(
    'localhost:50055',
    grpc.credentials.createInsecure()
)

module.exports=client