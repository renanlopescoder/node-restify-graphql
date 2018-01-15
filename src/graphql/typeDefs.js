import { mergeTypes } from 'merge-graphql-schemas';

// Type Imports
import userType from './user_schema/user.type.graphql';
import productType from './product_schema/product.type.graphql';

const types = [
  userType,
  productType,
];

export default mergeTypes(types);
