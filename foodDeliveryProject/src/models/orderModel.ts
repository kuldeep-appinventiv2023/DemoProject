import mongoose, { Document, Schema } from "mongoose";

enum OrderStatus {
  InProgress = "inProgress",
  Received = "received",
  Delivered = "delivered",
}

interface Orders extends Document {
  customerId: mongoose.Types.ObjectId;
  resturantId: mongoose.Types.ObjectId;
  staffId: mongoose.Types.ObjectId;
  AddressId: number;
  status: OrderStatus;
  placeOrderDate: Date;
  deliveryDate: Date;
}

const ordersSchema = new mongoose.Schema<Orders>({
  customerId: { type: Schema.Types.ObjectId, ref: "customers", required: true },
  resturantId: {
    type: Schema.Types.ObjectId,
    ref: "restaurants",
    required: true,
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "deliveryStaffs",
    required: true,
  },
  AddressId: { type: Number, required: true },
  status: { type: String, enum: Object.values(OrderStatus), required: true },
  placeOrderDate: { type: Date, default:Date.now},
  deliveryDate: { type: Date, required: true },
});

const Orders = mongoose.model<Orders>("orders", ordersSchema);
console.log("Orders model created...");
export default Orders;
