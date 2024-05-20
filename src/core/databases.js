import mongoose from "mongoose";

const appDataDB = mongoose.connection.useDb("appData");

export { appDataDB };
