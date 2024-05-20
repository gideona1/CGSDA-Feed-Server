import { GraphQLError } from "graphql";
import { Posts } from "../../models/Posts.js";

export const getPost = async (_, { postId }) => {
  try {
    return await Posts.findById(postId);
  } catch (error) {
    throw new GraphQLError("There was a problem getting post details", {
      extensions: {
        code: "UNKNOWN_POST_ERROR",
      },
    });
  }
};
