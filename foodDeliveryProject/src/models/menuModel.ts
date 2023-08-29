import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

interface Menu extends Document {
  categoryId: mongoose.Types.ObjectId;
  menuName: string;
  image: Buffer;
}

const menuSchema = new mongoose.Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "categories", required: true
  },
  menuName: { type: String, required: true },
  image: { type: Buffer }
});

const Menu = mongoose.model("menu", menuSchema);
console.log("Menu model created...");
module.exports = Menu;
export default mongoose.model<Menu>("menu", menuSchema);
