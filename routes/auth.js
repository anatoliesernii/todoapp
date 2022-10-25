import express from "express";
import passport from "passport";
import { UserModel } from "../models/user.js";

const router = express.Router();

const CLIENT_URL =
   process.env.ENV_STATUS === "development"
      ? "http://localhost:3000"
      : "https://todoapp-anatolie.herokuapp.com";

router.get("/login/success", (req, res) => {
   if (req.user) {
      res.status(200).json({
         success: true,
         message: "Welcome",
         user: req.user,
         session: req.session,
      });
   }
});

router.get("login/failed", (req, res) => {
   res.status(401).json({
      success: false,
      message: "Could not authenticate TEXT HERE.",
   });
});

router.get("/logout", (req, res) => {
   req.logout((err) => {
      if (!err) {
         res.redirect(CLIENT_URL);
      }
   });
});

// Local Strategy
router.post("/register", function (req, res) {
   UserModel.register(
      { username: req.body.username, displayName: req.body.displayName },
      req.body.password,
      (err, user) => {
         if (err) {
            // error example: user already registered
            console.log(err);
            res.redirect(CLIENT_URL); // here new somehow to pass data that user is alrdy registered.
         } else {
            // If no errors and user is successfully registered.
            // Now use passport.authenticate() with the type of 'local'.
            // That will set up a cookie and save their current log-in session.
            passport.authenticate("local")(req, res, () => {
               // console.log(req.user);
               console.log("User registed + logged in");
               res.redirect(`${CLIENT_URL}/user`);
            });
         }
      }
   );
});

router.post("/login", function (req, res) {
   // Create a new user Object with the use of userSchema.
   const loginUser = new UserModel({
      username: req.body.username,
      password: req.body.password,
   });

   // Now that we have the info user typed inside the login form as an OBJECT.
   // We add the '.login()' method to the request and passport-local-mongoose will haddle the encyption and look up inside the DB to find that user.
   // We need to pass the loginUser Object and a callback function that will return if there is an Error or execute some code.
   req.login(loginUser, (err) => {
      if (err) {
         console.log(err);
         res.redirect(`${CLIENT_URL}/failedtolog`); // Add page here if user is not Registered. Prompt him to /register page component.
      } else {
         // If no errors and user is successfully logged in.
         // Now use passport.authenticate() with the type of 'local'.
         // That will set up a cookie and save their current log-in session.
         passport.authenticate("local")(req, res, () => {
            console.log("userlogged in");
            res.redirect(`${CLIENT_URL}/user`);
         });
      }
   });
});

// Google Strategy
router.get(
   "/google",
   passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
   "/google/callback",
   passport.authenticate("google", {
      // successRedirect: `${CLIENT_URL}`,
      failureRedirect: "/login/failed",
   }),
   (req, res) => {
      console.log("Google Login from user: " + req.user.displayName);
      res.redirect(`${CLIENT_URL}/user`);
   }
);

// Facebook Strategy
router.get("/facebook", passport.authenticate("facebook"));
router.get(
   "/facebook/callback",
   passport.authenticate("facebook", { failureRedirect: "/login" }),
   (req, res) => {
      console.log("Facebook Login from user: " + req.user.displayName);
      res.redirect(`${CLIENT_URL}/user`);
   }
);

export default router;
