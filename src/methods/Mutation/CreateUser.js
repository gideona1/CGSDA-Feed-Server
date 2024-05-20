import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { Credentials } from "../../models/Credentials.js";
import { Users } from "../../models/Users.js";
import generateToken from "../Utils/GenerateToken.js";


export const createUser = async (_, { username, name, password }) => {
  try {
    if (username == "" || password == "") {
      throw new GraphQLError("All required input must be filled.", {
        extensions: {
          code: "INVALID_INPUT",
        },
      });
    }

    if ((await Users.findOne({ username })) && (await Credentials.findOne({ username }))) {
      throw new GraphQLError("A user is already registered with the username: " + username, {
        extensions: {
          code: "USER_ALREADY_EXISTS",
        },
      });
    }

    // Create credentials
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const credential = new Credentials({
      username: username.toLowerCase(),
      password: hashedPassword,
      name
    });

    // Create user profile
    const user = new Users({
      username,
      name
    });

    // Save credential and user information to DB
    await credential.save();
    await user.save();

    const tokens = await generateToken(user);
    return tokens;
  } catch (error) {
    throw new GraphQLError(error.message ? error.message : "Something went wrong...sorry I guess", {
      extensions: {
        code: error.extensions.code ? error.extensions.code : "IDONTKNOW",
      },
    });
  }
};
