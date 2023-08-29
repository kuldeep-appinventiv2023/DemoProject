"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deliveryStaffServices_1 = __importDefault(require("../../services/admin/deliveryStaffServices"));
const constants_1 = require("../../constants");
class DeliveryStaffController {
    async add(req, res) {
        const newDeliveryStaffData = req.body;
        try {
            const newDeliveryStaff = await deliveryStaffServices_1.default.addDeliveryStaff(newDeliveryStaffData);
            res.status(201).json({ success: true, message: constants_1.Constants.successMsgs.staffAdded, deliveryStaff: newDeliveryStaff });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorAddingStaff });
        }
    }
    async getAll(req, res) {
        try {
            const deliveryStaffList = await deliveryStaffServices_1.default.getAllDeliveryStaff();
            res.status(200).json({ success: true, deliveryStaffList });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.somethingWentWrong });
        }
    }
    async getById(req, res) {
        const staffId = req.params.id;
        try {
            const deliveryStaff = await deliveryStaffServices_1.default.getDeliveryStaffById(Number(staffId));
            res.status(200).json({ success: true, deliveryStaff });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.somethingWentWrong });
        }
    }
    async update(req, res) {
        const staffId = req.params.id;
        const updateData = req.body;
        try {
            const updatedDeliveryStaff = await deliveryStaffServices_1.default.updateDeliveryStaff(Number(staffId), updateData);
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.staffUpdated, deliveryStaff: updatedDeliveryStaff });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorUpdatingStaff });
        }
    }
    async delete(req, res) {
        const staffId = req.params.id;
        try {
            await deliveryStaffServices_1.default.deleteDeliveryStaff(Number(staffId));
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.staffDeleted });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorDeletingStaff });
        }
    }
}
exports.default = new DeliveryStaffController();
//# sourceMappingURL=deliveryStaffController.js.map