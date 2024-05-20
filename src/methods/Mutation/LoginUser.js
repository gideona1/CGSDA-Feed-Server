import { Credentials } from "../../models/Credentials.js";
import { Users } from "../../models/Users.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { GraphQLError } from "graphql";
import generateToken from "../Utils/GenerateToken.js";

export const loginUser = async (_, { username, password }) => {
  const credential = await Credentials.findOne({ $or: [{ username: username }, { email: username }] });

  if (credential && (await bcrypt.compare(password, credential.password))) {
    const user = await Users.findOne({ username: username });

    const tokens = await generateToken(user);
    return tokens;
  } else {
    throw new GraphQLError("Invalid email address, username, or password", {
      extensions: {
        code: "INVALID_CREDENTIALS",
      },
    });
  }
};
