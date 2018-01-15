import { mergeResolvers } from 'merge-graphql-schemas';

// Resolver Imports
import userResolver from './user_schema/user.resolver';
import productResolver from './product_schema/product.resolver';

const resolvers = [
  userResolver,
  productResolver,
];

export default mergeResolvers(resolvers);
