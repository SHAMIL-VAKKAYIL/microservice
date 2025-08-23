const grpc = require('@grpc/grpc-js')
const portoLoader = require('@grpc/proto-loader')
require('dotenv').config()
const path = require('path')

const userModel = require('./models/user.model')
const connectDB = require('./config/db')



const packageDef = portoLoader.loadSync(path.join(__dirname, '../protos/user.proto'))
const userProto = grpc.loadPackageDefinition(packageDef)
const userPackage = userProto.user


const server = new grpc.Server()

server.addService(userPackage.UserService.service, {

    getUserByEmail: async (call, callback) => {

        try {
            const { email } = call.request
            console.log(email);

            const user = await userModel.findOne({ email: email })

            if (!user) {
                return callback({
                    code: grpc.status.NOT_FOUND,
                    message: 'User not found',
                })
            }

            callback(null, {
                id: user._id.toString(),
                email: user.email,
                username: user.username,
                password: user.password
            })
        } catch (err) {
            console.error("getUserByEmail error:", err.message);
            callback({
                code: grpc.status.INTERNAL,
                message: 'Internal server error',
            });
        }

    },
    addUser: async (call, callback) => {
        const { username, email, password } = call.request

        const existing = await userModel.findOne({ email });
        if (existing) return callback(new Error('Email already exist'), null)

        const newUser = new userModel({ username, email, password })
        await newUser.save()

        callback(null, {})
    },
    getUserById: async (call, callback) => {
        const { id } = call.request
        console.log(call);
        
        console.log(id);
        

        const user = await userModel.findById(id).select('-password')
        if (!user) return callback(new Error('User not found'), null)

        callback(null, {
            id: user._id,
            username: user.username,
            email: user.email
        })
    },

});


(async () => {
    try {
        await connectDB();
        server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
            console.log("User gRPC server running on port 50051");
        });
    } catch (error) {
        console.error("Failed to connect DB in grpcServer:", error.message);
    }
})();