"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deliveryStaffModel_1 = __importDefault(require("../../models/deliveryStaffModel"));
class DeliveryStaffService {
    async addDeliveryStaff(newDeliveryStaffData) {
        const newDeliveryStaff = new deliveryStaffModel_1.default(newDeliveryStaffData);
        await newDeliveryStaff.save();
        return newDeliveryStaff;
    }
    async getAllDeliveryStaff() {
        const allDeliveryStaff = await deliveryStaffModel_1.default.find();
        return allDeliveryStaff;
    }
    async getDeliveryStaffById(staffId) {
        const deliveryStaff = await deliveryStaffModel_1.default.findOne({ staffId });
        return deliveryStaff;
    }
    async updateDeliveryStaff(staffId, updateData) {
        const updatedDeliveryStaff = await deliveryStaffModel_1.default.findOneAndUpdate({ staffId }, updateData, { new: true });
        return updatedDeliveryStaff;
    }
    async deleteDeliveryStaff(staffId) {
        const deletedDeliveryStaff = await deliveryStaffModel_1.default.findOneAndDelete({ staffId });
        return deletedDeliveryStaff;
    }
}
exports.default = new DeliveryStaffService();
//# sourceMappingURL=deliveryStaffServices.js.map