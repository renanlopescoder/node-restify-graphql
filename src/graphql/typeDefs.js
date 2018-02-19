import { mergeTypes } from 'merge-graphql-schemas';

// Type Imports
import userType from './user_schema/user.type.graphql';
import postType from './post_schema/post.type.graphql';

const types = [
  userType,
  postType,
];

export default mergeTypes(types);
