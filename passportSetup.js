import * as dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";

import { UserModel } from "./models/user.js";

// The createStrategy() is responsible to setup passport-local LocalStrategy with the correct options.
// https://www.npmjs.com/package/passport-local-mongoose
passport.use(UserModel.createStrategy());

// Google Data
passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL:
            "https://todoapp-anatolie.herokuapp.com/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
         UserModel.findOrCreate(
            {
               provider: profile.provider,
               googleId: profile.id,
               displayName: profile._json.name,
               mail: profile._json.email,
               googleImg: profile._json.picture,
            },
            function (err, user) {
               return cb(err, user);
            }
         );
      }
   )
);

// Facebook Data
// passport.use(
//    new FacebookStrategy(
//       {
//          clientID: process.env.FACEBOOK_APP_ID,
//          clientSecret: process.env.FACEBOOK_APP_SECRET,
//          callbackURL: "http://localhost:3000/auth/facebook/callback",
//          profileFields: ["id", "displayName", "email"],
//       },
//       function (accessToken, refreshToken, profile, cb) {
//          console.log(profile);
//          UserModel.findOrCreate(
//             {
//                provider: profile.provider,
//                facebookId: profile._json.id,
//                fullName: profile._json.name,
//                mail: profile._json.email,
//                // facebookImg: profile.photos[0].value, // can't use this cause image URL changes on every API call.
//             },
//             function (err, user) {
//                return cb(err, user);
//             }
//          );
//       }
//    )
// );

// passport use(GitHub-Strategy)

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, done) {
   done(null, user);
});
passport.deserializeUser(function (user, done) {
   done(null, user);
});
