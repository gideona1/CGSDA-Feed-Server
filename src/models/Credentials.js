import mongoose from "mongoose";
import { appDataDB } from "../core/databases.js";

const CredentialSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const Credentials = appDataDB.model("Credentials", CredentialSchema);
