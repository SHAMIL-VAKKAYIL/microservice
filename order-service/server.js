const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const typeDefs = require('./services/graphql/schema')
const resolvers = require('./services/graphql/resolver')
const connectDB = require('./config/db')
const getUserByIdAsync = require('../common-middleware/auth.middleware')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser());

//! verfying user for every grpahql request

const startServer = async () => {
    await connectDB()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })
    await server.start()

    app.use('/graphql', bodyParser.json(), expressMiddleware(server, {
        context: async ({ req }) => {

            let token

            const authHeader = req.headers.authorization;

            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }

            if (!token) {
                token = req.cookies.user
            }
            if (!token) return { user: null }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SCERATE)
                const data = await getUserByIdAsync({ id: decoded.id })

                return { user: data || null }
            } catch (err) {
                return { user: null }
            }
        }
    }));

    app.listen(5005, () => {
        console.log('server is runnig on 5005');
    })
    return app
}

startServer()

// module.exports = { startServer }
