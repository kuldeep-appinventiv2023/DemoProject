"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminModel_1 = __importDefault(require("../../models/adminModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const constants_1 = require("../../constants");
class AdminServices {
    async loginAdmin(email, password) {
        const admin = await adminModel_1.default.findOne({ email });
        if (!admin) {
            throw new Error(constants_1.Constants.errorMsgs.adminNotFound);
        }
        const checkPassword = await bcrypt_1.default.compare(password, admin.password);
        if (!checkPassword) {
            throw new Error(constants_1.Constants.errorMsgs.invalidPassword);
        }
        const token = jsonwebtoken_1.default.sign({ email: admin.email, id: admin._id }, jwtMiddleware_1.secretKey, {
            expiresIn: '1h',
        });
        return token;
    }
    async getAdminProfile(email) {
        try {
            const admin = await adminModel_1.default.findOne({ email });
            if (!admin) {
                throw new Error(constants_1.Constants.errorMsgs.adminNotFound);
            }
            return admin;
        }
        catch (error) {
            console.log(error);
            throw new Error(constants_1.Constants.errorMsgs.adminNotFound);
        }
    }
    async updateAdminProfile(email, adminData) {
        try {
            if (adminData.password) {
                const hashedPassword = await bcrypt_1.default.hash(adminData.password, 5);
                adminData.password = hashedPassword;
            }
            const updatedAdminProfile = await adminModel_1.default.findOneAndUpdate({ email: email }, { $set: adminData }, { new: true });
            if (!updatedAdminProfile) {
                throw new Error(constants_1.Constants.errorMsgs.adminNotFound);
            }
            else {
                return updatedAdminProfile;
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(constants_1.Constants.errorMsgs.updateFailed);
        }
    }
    async deleteAdminProfile(email) {
        try {
            const deleteAdminProfile = await adminModel_1.default.findOneAndDelete({ email });
            if (!deleteAdminProfile) {
                throw new Error(constants_1.Constants.errorMsgs.adminNotFound);
            }
            else {
                return deleteAdminProfile;
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(constants_1.Constants.errorMsgs.deleteFailed);
        }
    }
    async resetAdminPassword(email, superAdminEmail, newPassword) {
        try {
            const admin = await adminModel_1.default.findOne({ email });
            if (!admin) {
                return { success: false, message: constants_1.Constants.errorMsgs.adminNotFound };
            }
            if (superAdminEmail === admin.superAdminEmail) {
                const hashedPassword = await bcrypt_1.default.hash(newPassword, 5);
                admin.password = hashedPassword;
                await admin.save();
                const token = jsonwebtoken_1.default.sign({ email: admin.email }, jwtMiddleware_1.secretKey);
                return {
                    success: true,
                    message: constants_1.Constants.successMsgs.passwordUpdated,
                    token,
                };
            }
            else {
                return { success: false, message: constants_1.Constants.errorMsgs.securityFailed };
            }
        }
        catch (error) {
            console.log(error);
            return { success: false, message: constants_1.Constants.errorMsgs.somethingWentWrong };
        }
    }
}
exports.default = new AdminServices();
//# sourceMappingURL=profileServices.js.map