import mongoose, { Document, Schema } from "mongoose";

enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

interface ShippingAddress {  
  houseNo: string;  
  city: string;  
  district: string;  
  country: string;
  pinCode: number
}

interface Orders extends Document {
  cartId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  resturantId: mongoose.Types.ObjectId;
  staffId: mongoose.Types.ObjectId;
  status: OrderStatus;
  orderTotal : number;
  shippingAddress : ShippingAddress;
  placeOrderDate: Date;
  deliveryDate: Date;
}

const shippingAddressSchema = new mongoose.Schema({
  houseNo: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  country: { type: String, required: true },
  pinCode: { type: Number, required: true }
});

const ordersSchema = new mongoose.Schema({
  cartId: { type: Schema.Types.ObjectId, ref: "cart", required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "customers"},
  resturantId: { type: Schema.Types.ObjectId, ref: "restaurants"},
  staffId: { type: Schema.Types.ObjectId, ref: "deliveryStaffs"},
  status: { type: String, enum: Object.values(OrderStatus), default : 'pending' },
  orderTotal: { type: Number },
  shippingAddress: { type: shippingAddressSchema},
  placeOrderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date},
});

const Orders = mongoose.model<Orders>("orders", ordersSchema);
console.log("Orders model created...");
export default Orders;
