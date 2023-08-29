import mongoose, { Document, Schema } from "mongoose";

interface CartItem {
  itemId: Schema.Types.ObjectId;
  quantity: number;
  unit_price: number;
}

interface Cart extends Document {
  customerId: mongoose.Types.ObjectId;
  items: CartItem[];
  cartTotal: number;
  calculateTotal: () => void;
}

const cartSchema = new mongoose.Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required :true },
      quantity: { type: Number, required: true, default: 1 },
      unit_price: { type: Number },
    },
  ],
  cartTotal: { type: Number, required: true },
});

cartSchema.methods.calculateTotal = function () {
  this.cartTotal = this.items.reduce(
    (total : any , item : any) => total + item.quantity * item.unit_price,
    0
  );
};

const Cart = mongoose.model("cart", cartSchema);
console.log("Cart model created...");
module.exports = Cart;
export default mongoose.model<Cart>("cart", cartSchema);
