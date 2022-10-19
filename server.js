import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { UserModel } from "./models/user.js";
import "./passportSetup.js";

import authRouter from "./routes/auth.js";
// dummy change
const app = express();

// Below give options to cors in order to be able to fetch data from React @App.js when fetching USER profile during '/auth/login/success.'
app.use(
   cors({
      credentials: true,
      origin: "https://todoapp-anatolie.herokuapp.com",
   })
);

// app.use(
//    cors({
//       origin: "http://localhost:3000",
//       methods: "GET,POST,PUT,DELETE,PATCH",
//       credentials: true,
//    })
// );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Initialize a session.
app.use(
   session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      // cookie: { secure: true }
      cookie: {
         maxAge: 10 * 60 * 1000, //1min
      },
   })
);
app.use(passport.initialize()); // Initialize passport package.
app.use(passport.session()); // Set passport to use the build-in session() method so it will deal with the sessions.

const port = process.env.PORT || 5000;

// app.use(require("./routes/record"));
// mongoose.connect("mongodb://localhost:27017/todolistv3DB");
mongoose.connect(process.env.MONGO_URL);

// Requests

// Add Item to its corresponding list DONE!
// # Remove forEach loop and bring listIndex instad of listTitle. ########################
app.post("/api", (req, res) => {
   UserModel.findOne({ _id: req.body.userId }, (err, result) => {
      if (!err && result) {
         result.lists.forEach((list) => {
            if (list.title === req.body.listTitle) {
               list.items.push(req.body.item);
            }
         });
         result.save();
         console.log(
            "Added new Item: " +
               req.body.item.name +
               " to LIST: " +
               req.body.listTitle
         );
         res.json({
            result,
         });
      }
   });
});

// Delete Item from a List. DONE!
app.delete("/api", (req, res) => {
   const idx = req.body.listIndex;

   UserModel.findOne({ _id: req.body.userId }, (err, result) => {
      if (!err && result) {
         result.lists[idx].items = result.lists[idx].items.filter((item) => {
            return item.name !== req.body.itemName;
         });
         result.save();

         console.log("Deleted Item: " + req.body.itemName);
         res.json({
            result,
         });
      } else {
         console.log(err);
      }
   });
});

// Toggle item checkbox in corresponding List. DONE!
app.patch("/api", (req, res) => {
   const idx = req.body.listIndex;

   UserModel.findOne({ _id: req.body.userId }, (err, result) => {
      if (!err && result) {
         result.lists[idx].items.map((item) => {
            if (item._id == req.body.itemId) {
               item.status = req.body.status;
            }
         });
         result.save();

         console.log("Toggled status on item: " + req.body.itemId);
         res.json({
            result,
         });
      } else {
         console.log(err);
      }
   });
});

// Add new List. DONE!
app.post("/api/list", (req, res) => {
   UserModel.findOne({ _id: req.body.userId }, (err, result) => {
      if (!err) {
         result.lists.push({
            title: req.body.listTitle,
            items: [],
         });
         result.save();
      }
      console.log(
         "Added listTitle: " +
            req.body.listTitle +
            " to User: " +
            result.displayName
      );
      res.json({
         result,
      });
   });
});

// Delete a List from List Bucket. DONE!
app.delete("/api/list", (req, res) => {
   UserModel.findOne({ _id: req.body.userId }, (err, result) => {
      if (!err) {
         result.lists = result.lists.filter((list) => {
            return list.title !== req.body.listTitle;
         });
         result.save();
         console.log("Deleted List: " + req.body.listTitle);
         res.json({
            result,
         });
      } else {
         console.log(err);
      }
   });
});

app.use("/auth", authRouter);

app.get("/login/failed", (req, res) => {
   console.log("app.get here server.js file");
   res.send("Failed!");
});

// UserModel.findOne({ _id: "634b7fe5627c4dddcda7a113" }, (err, result) => {
//    result.lists[0].items.push({ name: "second item", status: false });
//    // result.save();
// });
// app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.static("/client/build", { root: "." }));

app.get("/*", (req, res) => {
   // res.sendFile(path.join(__dirname, "client/build", "index.html"));
   res.sendFile("index.html", { root: "./client/build" });
});

app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});
