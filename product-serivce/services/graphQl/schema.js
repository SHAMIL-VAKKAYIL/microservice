import gql from "graphql-tag"

const typeDefs = gql`
type Product{
    id: ID!
    name: String!
    price: Float!
    size: String!
    stocks: Float!
    category: String
    description:String!
    active:Boolean
}

input ProductFilter{
    minPrice: Float
    maxPrice: Float
    category: String
}

type Query {
    products(filter: ProductFilter): [Product]
  }
`

export default typeDefs