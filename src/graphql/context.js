import UserModel from './user_schema/user.model';
import PostModel from './post_schema/post.model';

const context = {
  User: UserModel,
  Post: PostModel,
};

export default context;
