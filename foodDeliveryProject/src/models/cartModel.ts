import mongoose, { Document, Schema } from "mongoose";

interface cartItems {
  itemId: Schema.Types.ObjectId; // item
  quantity: number; // req.body
  unit_price: number; // req.body
}

interface Cart extends Document {
  customerId: mongoose.Types.ObjectId;
  items: cartItems;
  cartTotal: number;
}

const cartSchema = new mongoose.Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, required: true, default: 1 },
      unit_price: { type: Number },
    },
  ],
  cartTotal: { type: Number, required: true },
});

cartSchema.methods.calculateTotal = function () {
  this.cartTotal = this.items.reduce(
    ( total , item ) => total + item.quantity * item.unit_price,
    0
  );
};

const Cart = mongoose.model("cart", cartSchema);
console.log("Cart model created...");
module.exports = Cart;
export default mongoose.model<Cart>("cart", cartSchema);
