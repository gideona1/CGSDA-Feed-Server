import { GraphQLError } from "graphql";
import { Posts } from "../../models/Posts.js";
import checkUserExist from "../Utils/CheckUserExist.js";

export const createPost = async (_, { content }, { user: { id } }) => {
  try {
    if (!(await checkUserExist(id))) {
      throw new GraphQLError("There was a problem accessing your account", {
        extensions: {
          code: "USER_UNDEFINED_NULL",
        },
      });
    }

    // Create user profile
    const post = new Posts({
      owner: id,
      content
    });

    await post.save();

    return post;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(error.message ? error.message : "Something went wrong...sorry I guess", {
      extensions: {
        code: error.extensions.code ? error.extensions.code : "IDONTKNOW",
      },
    });
  }
};
