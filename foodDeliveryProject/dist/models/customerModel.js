"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const addressSchema = new mongoose_1.default.Schema({
    houseNo: { type: String, required: true },
    streetNo: { type: Number, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: Number, required: true }
});
const customerSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String },
    DOB: { type: Date },
    gender: { type: String },
    profileImage: { type: Buffer },
    favoriteFood: { type: String, required: true },
    customerAddress: { type: addressSchema },
    verified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
// const Customer = mongoose.model('customer', customerSchema);
// console.log('Customer model created...');
// module.exports = Customer;
exports.default = mongoose_1.default.model('customer', customerSchema);
//# sourceMappingURL=customerModel.js.map