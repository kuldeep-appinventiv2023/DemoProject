"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profileServices_1 = __importDefault(require("../../services/admin/profileServices"));
const constants_1 = require("../../constants");
class AdminProfileController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await profileServices_1.default.loginAdmin(email, password);
            res.status(200).json({ success: true, token });
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: constants_1.Constants.errorMsgs.loginFailed });
        }
    }
    async getProfile(req, res) {
        const email = req.body.email;
        try {
            const admin = await profileServices_1.default.getAdminProfile(email);
            res.send(admin);
        }
        catch (error) {
            console.log(error);
            res.status(401).send(error);
        }
    }
    async updateProfile(req, res) {
        const adminData = req.body;
        try {
            const email = req.body.email;
            const updatedAdminProfile = await profileServices_1.default.updateAdminProfile(email, adminData);
            if (!updatedAdminProfile) {
                return res.status(404).json({ message: constants_1.Constants.errorMsgs.adminNotFound });
            }
            else {
                res.status(200).json({ message: constants_1.Constants.successMsgs.profileUpdated, updatedAdminProfile });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: constants_1.Constants.errorMsgs.updateFailed });
        }
    }
    async deleteProfile(req, res) {
        try {
            const email = req.body.email;
            const deleteAdminProfile = await profileServices_1.default.deleteAdminProfile(email);
            if (!deleteAdminProfile) {
                return res.status(404).json({ message: constants_1.Constants.errorMsgs.adminNotFound });
            }
            else {
                res.json({ message: constants_1.Constants.successMsgs.profileDeleted, deleteAdminProfile });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: constants_1.Constants.errorMsgs.deleteFailed });
        }
    }
    async forgetPassword(req, res) {
        const { email, superAdminEmail, newPassword } = req.body;
        const result = await profileServices_1.default.resetAdminPassword(email, superAdminEmail, newPassword);
        if (result.success) {
            res.json({ message: result.message, token: result.token });
        }
        else {
            res.status(404).json({ message: result.message });
        }
    }
}
exports.default = new AdminProfileController();
//# sourceMappingURL=profileController.js.map