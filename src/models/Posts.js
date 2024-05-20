import mongoose from "mongoose";
import { appDataDB } from "../core/databases.js";
const ObjectId = mongoose.Types.ObjectId;

const PostSchema = new mongoose.Schema(
    {
        owner: { type: ObjectId, required: true },
        content: { type: String, required: true },
        comments: { type: [ObjectId] },
        likes: { type: [ObjectId] },
    },
    { timestamps: true }
);

export const Posts = appDataDB.model("Posts", PostSchema);
