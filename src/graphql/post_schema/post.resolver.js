export default {
  Query: {
    allPosts: async (parent, args, { Post }) => {
      const posts = await Post.find();
      return posts.map((post) => {
        post._id = post._id.toString();
        return post;
      });
    },
    findPost: async (parent, args, { Post }) => {
      const post = await post.findOne({ _id: args });
      post._id = post._id.toString();
      return post;
    },
  },
  Mutation: {
    createPost: async (parent, args, { Post }) => {
      const post = await new Post(args).save();
      post._id = post._id.toString();
      return post;
    },
  },
};
