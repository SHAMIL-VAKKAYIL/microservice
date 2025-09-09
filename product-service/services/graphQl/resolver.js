import productModel from "../../models/product.model.js"

 const resolvers = {
    Query: {
        products: async (_, { filter }) => {
            const query = {}

            if (filter?.category) query.category = filter.category
            if (filter?.minPrice !== undefined || filter?.maxPrice !== undefined) {
                query.price = {}

                if (filter?.minPrice !== undefined) query.price.$gte = filter.minPrice
                if (filter?.maxPrice !== undefined) query.price.$lte = filter.maxPrice
            }
             return await productModel.find(query)
        }
    }
}
export default resolvers    