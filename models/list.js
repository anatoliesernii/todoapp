import mongoose from "mongoose";
import { itemSchema } from "./item.js";

export const listSchema = new mongoose.Schema({
   title: String,
   items: [itemSchema],
});


export const ListModel = new mongoose.model("List", listSchema);
