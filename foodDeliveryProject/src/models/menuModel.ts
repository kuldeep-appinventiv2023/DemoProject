import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface Menu extends Document {
  categoryId: mongoose.Types.ObjectId;
  itemName: string;
  price: mongoose.Types.Decimal128;
  image: Buffer;
  isAvailable: boolean;
}

const menuSchema = new mongoose.Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "categpries",
    required: true,
  },
  itemName: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  image: { type: Buffer },
  isAvailable: { type: String, required: true },
});

const Menu = mongoose.model("menu", menuSchema);
console.log("Menu model created...");
module.exports = Menu;
export default mongoose.model<Menu>("menu", menuSchema);
