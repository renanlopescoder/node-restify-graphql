import UserModel from './user_schema/user.model';
import PostModel from './post_schema/post.model';

const context = {
  User: UserModel.User,
  Post: PostModel.Post,
};

export default context;
