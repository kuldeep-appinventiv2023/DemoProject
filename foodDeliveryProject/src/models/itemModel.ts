import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface Item extends Document {
  menuId: mongoose.Types.ObjectId;
  name: string;
  price: mongoose.Types.Decimal128;
  image: Buffer;
  isAvailable: boolean;
}

const itemSchema = new mongoose.Schema({
    menuId: {
    type: Schema.Types.ObjectId,
    ref: "menu",
    required: true,
  },
  name: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  image: { type: Buffer },
  isAvailable: { type: String},
});

const Item = mongoose.model("item", itemSchema);
console.log("Item model created...");
module.exports = Item;
export default mongoose.model<Item>("item", itemSchema);
