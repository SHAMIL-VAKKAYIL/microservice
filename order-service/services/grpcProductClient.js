const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')


const packageDef = protoLoader.loadSync(path.join(__dirname, '../../protos/product.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})
const productProto = grpc.loadPackageDefinition(packageDef)
const productPackage = productProto.product

const client = new productPackage.ProductService(
    'localhost:50059',
    grpc.credentials.createInsecure()
)

module.exports = client