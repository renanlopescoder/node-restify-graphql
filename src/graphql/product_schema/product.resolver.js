export default {
  Query: {
    allProducts: async (parent, args, { Product }) => {
      const products = await Product.find();
      return products.map(product => {
        product._id = product._id.toString();
        return product;
      });
    },
    findProduct: async (parent, args, { Product }) => {
      let product = await Product.findOne({ '_id': args });
      product._id = product._id.toString();
      return product;
    }
  },
  Mutation: {
    createProduct: async (parent, args, { Product }) => {
      const product = await new Product(args).save();
      product._id = product._id.toString();
      return product;
    }
  }
};
