import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import { listSchema } from "./list.js";

export const userSchema = new mongoose.Schema({
   username: String,
   password: String,
   displayName: String,
   provider: {
      type: String,
      default: "local",
   },
   googleId: String,
   facebookId: String,
   googleImg: String,
   facebookImg: String,
   mail: String,
   lists: [listSchema],
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

export const UserModel = new mongoose.model("User", userSchema);
