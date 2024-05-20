import { GraphQLError } from "graphql";
import { Posts } from "../../models/Posts.js";

export const getPosts = async () => {
  try {
    return await Posts.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new GraphQLError("There was a problem getting post details", {
      extensions: {
        code: "UNKNOWN_POST_ERROR",
      },
    });
  }
};
