import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
   name: String,
   status: Boolean,
});

export const ItemModel = new mongoose.model("Item", itemSchema);
