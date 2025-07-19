const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')


const packageDef = protoLoader.loadSync(path.join(__dirname, '../../protos/user.proto'))
const userProto = grpc.loadPackageDefinition(packageDef)
const userPackage = userProto.user


const client = new userPackage.UserService(
    'localhost:50051',
    grpc.credentials.createInsecure()
)

module.exports = client