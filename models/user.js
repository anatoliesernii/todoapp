import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { listSchema } from "./list.js";

export const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   displayName: String,
   lists: [listSchema],
});

userSchema.plugin(passportLocalMongoose);

export const UserModel = new mongoose.model("User", userSchema);
