"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "pending";
    OrderStatus["Confirmed"] = "confirmed";
    OrderStatus["Shipped"] = "shipped";
    OrderStatus["Delivered"] = "delivered";
    OrderStatus["Cancelled"] = "cancelled";
})(OrderStatus || (OrderStatus = {}));
const shippingAddressSchema = new mongoose_1.default.Schema({
    houseNo: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true }
});
const ordersSchema = new mongoose_1.default.Schema({
    cartId: { type: mongoose_1.Schema.Types.ObjectId, ref: "cart", required: true },
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "customers" },
    resturantId: { type: mongoose_1.Schema.Types.ObjectId, ref: "restaurants" },
    staffId: { type: mongoose_1.Schema.Types.ObjectId, ref: "deliveryStaffs" },
    status: { type: String, enum: Object.values(OrderStatus) },
    orderTotal: { type: Number },
    shippingAddress: { type: shippingAddressSchema },
    placeOrderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
});
const Orders = mongoose_1.default.model("orders", ordersSchema);
console.log("Orders model created...");
exports.default = Orders;
//# sourceMappingURL=orderModel.js.map