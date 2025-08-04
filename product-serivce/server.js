import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import typeDefs from './services/graphQl/schema.js';
import resolvers from './services/graphQl/resolver.js';

import connectDB from './config/db.js';
import productRouter from './routes/product.routes.js';
import { buildSubgraphSchema } from '@apollo/subgraph';

dotenv.config();

const app = express()
connectDB()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))


const startServer = async () => {

    const server = new ApolloServer({
        schema: buildSubgraphSchema({ typeDefs, resolvers })
    })
    await server.start()

    app.use('/api/product', productRouter)
    app.use('/graphql',expressMiddleware(server),);

    app.listen(5003, () => {
        console.log('server is runnig on 5003');
    })
}
startServer()