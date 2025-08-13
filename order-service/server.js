const express = require('express')
const dotenv = require('dotenv')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const typeDefs = require('./services/graphql/schema')
const resolvers = require('./services/graphql/resolver')
const connectDB = require('./config/db')
const { userProtectRoute } = require('../common-middleware/auth.middleware')

dotenv.config()

const app = express()

//! verfying user for every grpahql request

const context = async ({ req }) => {

    let token
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]
    } else if (req.cookies?.user) {
        token = req.cookies.user
    }

    if (!token) return { user: null }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const data = await getUserByIdAsync({ id: decoded.id })

        return { user: data || null }
    } catch (err) {
        return { user: null }
    }
};

const startServer = async () => {
    await connectDB()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
    })
    await server.start()

    app.listen(5005, () => {
        console.log('server is runnig on 5005');
    })
}

startServer()