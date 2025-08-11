const gql = require('graphql-tag')

const typeDefs = gql`

type orderItem {
    productId: String!
    name: String
    price: Float
    quantity: Int

}

type Order {
    id: ID!
    product: [orderItem!]!
    totalPrice: Float!
    status: String!
    createdAt: String
    updatedAt: String
}

`