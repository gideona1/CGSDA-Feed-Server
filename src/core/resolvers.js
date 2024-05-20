import { getPosts, getPost, getUser } from "../methods/Query/index.js";
import { createUser, createPost, loginUser, likePost } from "../methods/Mutation/index.js";
import { dateScalar } from "./scalars/dateScalar.js";
import { Users } from "../models/Users.js";
import { Posts } from "../models/Posts.js";
import mongoose from "mongoose";

export const resolvers = {
  Date: dateScalar,

  Mutation: {
    createUser,
    createPost,
    loginUser,
    likePost
  },

  Query: {
    getUser,
    getPost,
    getPosts,
  },

  User: {
    posts: async ({ id }) => { return await Posts.find({ owner: id }).sort({ createdAt: -1 }); },
  },

  Post: {
    owner: async ({ owner }) => { return await Users.findById(owner); },
    isLiking: async ({ likes }, _, { user: { id } }) => { return likes.includes(new mongoose.Types.ObjectId(id)) }
  },
};
