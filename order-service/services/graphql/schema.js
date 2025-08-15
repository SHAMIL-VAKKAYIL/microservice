const gql = require('graphql-tag')

const typeDefs = gql`

type OrderItem {
    productId: ID!
    name: String
    price: Float
    quantity: Int

}

type Order {
    id: ID!
    products: [OrderItem!]!
    total: Float!
    status: String!
    createdAt: String
    updatedAt: String
}

input OrderItemInput {
productId: ID!
quantity: Int!
}

type Query{
    orders:[Order!]!
    myOders:[Order!]!
    singleOrder(id:ID!):Order
}

type Mutation{
    createOrder(items:[OrderItemInput!]!):Order
    updateOrder(id:ID!,status:String!):Order
}

`
module.exports = typeDefs