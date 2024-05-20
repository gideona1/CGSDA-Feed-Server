import mongoose from "mongoose";
import { appDataDB } from "../core/databases.js";
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    name: { type: String, default: "CGSDA User", maxLength: 30 },
    reposts: { type: [ObjectId] },
    following: { type: [ObjectId] },
  },
  { timestamps: true }
);

export const Users = appDataDB.model("Users", UserSchema);
