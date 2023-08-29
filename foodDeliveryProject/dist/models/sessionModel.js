"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = new mongoose_1.default.Schema({
    customerId: { type: Object, required: true },
    deviceId: { type: String },
    deviceType: { type: String },
    isActive: { type: Boolean, required: true, default: false }
});
const Session = mongoose_1.default.model('session', sessionSchema);
console.log('Session model created...');
module.exports = Session;
exports.default = mongoose_1.default.model('session', sessionSchema);
//# sourceMappingURL=sessionModel.js.map