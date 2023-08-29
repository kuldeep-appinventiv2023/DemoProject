"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String },
    email: { type: String, required: true },
    profileImage: { type: Buffer },
    superAdminEmail: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
const Admin = mongoose_1.default.model('admin', adminSchema);
console.log('Admin model created...');
module.exports = Admin;
exports.default = mongoose_1.default.model('admin', adminSchema);
//# sourceMappingURL=adminModel.js.map