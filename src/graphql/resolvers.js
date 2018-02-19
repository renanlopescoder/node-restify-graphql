import { mergeResolvers } from 'merge-graphql-schemas';

// Resolver Imports
import userResolver from './user_schema/user.resolver';
import postResolver from './post_schema/post.resolver';

const resolvers = [
  userResolver,
  postResolver,
];

export default mergeResolvers(resolvers);
