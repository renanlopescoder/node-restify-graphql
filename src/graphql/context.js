import UserModel from './user_schema/user.model';
import ProductModel from './product_schema/product.model';

const context = {
  User: UserModel,
  Product: ProductModel,
};

export default context;
