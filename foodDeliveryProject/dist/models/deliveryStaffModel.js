"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const deliveryStaffSchema = new mongoose_1.default.Schema({
    resturantId: { type: mongoose_2.Schema.Types.ObjectId, ref: "restaurants", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    DOB: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    isAvailable: { type: Boolean, default: true },
});
const DeliveryStaff = mongoose_1.default.model('deliveryStaff', deliveryStaffSchema);
console.log('DeliveryStaff model created...');
module.exports = DeliveryStaff;
exports.default = mongoose_1.default.model('deliveryStaff', deliveryStaffSchema);
//# sourceMappingURL=deliveryStaffModel.js.map