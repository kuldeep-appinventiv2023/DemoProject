"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("../../services/customer/emailService");
const profileServices_1 = __importDefault(require("../../services/customer/profileServices"));
const constants_1 = require("../../constants");
class CustomerController {
    async signup(req, res) {
        const { username, password, firstName, lastName, email, favoriteFood } = req.body;
        try {
            const newCustomer = await profileServices_1.default.signup(username, password, firstName, lastName, email, favoriteFood);
            (0, emailService_1.sendVerifyMail)(firstName, email, newCustomer._id);
            res.status(201).json({
                success: true,
                message: constants_1.Constants.successMsgs.customerRegistered,
                customer: newCustomer,
            });
        }
        catch (error) {
            console.log(error);
            if (error.message === constants_1.Constants.errorMsgs.customerExists) {
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.somethingWentWrong });
            }
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await profileServices_1.default.login(email, password);
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.loginSuccess, token });
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: constants_1.Constants.errorMsgs.loginFailed });
        }
    }
    async getProfile(req, res) {
        const email = req.body.email;
        try {
            const customer = await profileServices_1.default.getProfile(email);
            res.status(200).json({ success: true, customer });
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: constants_1.Constants.errorMsgs.customerNotFound });
        }
    }
    async updateProfile(req, res) {
        const customerData = req.body;
        try {
            const email = req.body.email;
            const updatedCustomerProfile = await profileServices_1.default.updateProfile(email, customerData);
            if (!updatedCustomerProfile) {
                return res.status(404).json({ success: false, message: constants_1.Constants.errorMsgs.customerNotFound });
            }
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.profileUpdated, customer: updatedCustomerProfile });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.updateProfileFailed });
        }
    }
    async deleteProfile(req, res) {
        const email = req.body.email;
        try {
            const deleteCustomerProfile = await profileServices_1.default.deleteProfile(email);
            if (!deleteCustomerProfile) {
                return res.status(404).json({ success: false, message: constants_1.Constants.errorMsgs.customerNotFound });
            }
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.profileDeleted, deletedCustomer: deleteCustomerProfile });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.deleteProfileFailed });
        }
    }
    async forgetPassword(req, res) {
        const { email, favoriteFood, newPassword } = req.body;
        try {
            const result = await profileServices_1.default.forgetPassword(email, favoriteFood, newPassword);
            if (result.success) {
                res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.passwordUpdated, token: result.token });
            }
            else {
                res.status(404).json({ success: false, message: constants_1.Constants.errorMsgs.resetPasswordFailed });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.somethingWentWrong });
        }
    }
    async customerLogout(req, res) {
        const email = req.body.email;
        try {
            const result = await profileServices_1.default.logout(email);
            if (result.success) {
                res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.logoutSuccess });
            }
            else {
                res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.logoutFailed });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.somethingWentWrong });
        }
    }
}
exports.default = new CustomerController();
//# sourceMappingURL=profileController.js.map