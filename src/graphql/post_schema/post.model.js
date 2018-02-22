import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

exports.Post = mongoose.model('Post', schema);
