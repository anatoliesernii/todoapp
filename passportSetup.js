import passport from "passport";
import { UserModel } from "./models/user.js";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// The createStrategy() is responsible to setup passport-local LocalStrategy with the correct options.
// https://www.npmjs.com/package/passport-local-mongoose
passport.use(UserModel.createStrategy());

// passport use(Google-Strategy)

// passport use(Facebook-Strategy)

// passport use(GitHub-Strategy)

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, done) {
   done(null, user);
});
passport.deserializeUser(function (user, done) {
   done(null, user);
});
