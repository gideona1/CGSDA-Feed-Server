import { GraphQLError } from "graphql";
import { Posts } from "../../models/Posts.js";
import checkUserExist from "../Utils/CheckUserExist.js";
import mongoose from "mongoose";

export const likePost = async (_, { postId }, { user: { id } }) => {
  if (!(await checkUserExist(id))) {
    throw new GraphQLError("The account you are trying to access does not exist", {
      extensions: {
        code: "USER_UNDEFINED_NULL",
      },
    });
  }

  const post = await Posts.findById(postId);
  if (!post) {
    throw new GraphQLError("The post you are trying to access does not exist", {
      extensions: {
        code: "POST_UNDEFINED_NULL",
      },
    });
  }

  if (post.likes.includes(new mongoose.Types.ObjectId(id))) {
    await Posts.findByIdAndUpdate(postId, { $pull: { likes: id } });
  } else {
    await Posts.findByIdAndUpdate(postId, { $addToSet: { likes: id } });
  }

  return true;
};
