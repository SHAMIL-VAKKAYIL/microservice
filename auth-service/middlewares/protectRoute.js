const jwt = require('jsonwebtoken')
const client = require('../services/userGrpcClient')
const { promisify } = require('util')

const getUserByIdAsync = promisify(client.getUserById).bind(client)

exports.userProtectRoute = async (req, res, next) => {
    try {

        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            token = req.cookies.user
        }

        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SCERATE)
        console.log("Decoded token ID:", decoded.id);

        if (!decoded) {
            return res.status(401).json({ msg: "Token verification failed" })
        }

        //grpc client calling becuase it was a callback fucntion we cannot asyn this so we want to promisify this 
        const data = await getUserByIdAsync({ id: decoded.id })
        console.log(data);


        if (!data) {
            console.log('wzexrdcftvgybhu');

            return res.status(401).json({ msg: "User not found" });
        }
        req.user = data
        next()

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Server error" })

    }
}
