const grpc = require('@grpc/grpc-js')
const portoLoader = require('@grpc/proto-loader')
const path = require('path')
const userModel = require('./models/user.model')


const packageDef = portoLoader.loadSync(path.join(__dirname, '../protos/user.proto'))
const userProto = grpc.loadPackageDefinition(packageDef)
const userPackage = userProto.user


const server = new grpc.Server()

server.addService(userPackage.UserService.service, {
    getUserByEmail: async (call, callback) => {
        const { email } = call.request
        const user = await userModel.findOne({ email: email })
        if (!user) return callback(new Error('user not found'), null)

        callback(null, {
            id: user._id.toString(),
            email: user.email,
            password: user.password
        })
    },
})

server.bindAsync('0.0.0.0:50051',grpc.ServerCredentials.createInsecure(),()=>{
    console.log("User gRPC server running on port 50051")
})