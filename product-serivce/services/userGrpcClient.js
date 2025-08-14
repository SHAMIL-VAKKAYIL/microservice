import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDef = protoLoader.loadSync(path.join(__dirname, '../../protos/user.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})
const userProto = grpc.loadPackageDefinition(packageDef)
const userPackage = userProto.user


const client = new userPackage.UserService(
    'localhost:50053',
    grpc.credentials.createInsecure()
)


export default client