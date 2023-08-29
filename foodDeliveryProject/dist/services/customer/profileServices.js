"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const customerModel_1 = __importDefault(require("../../models/customerModel"));
const sessionModel_1 = __importDefault(require("../../models/sessionModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const redis_1 = require("redis");
const mongoose_1 = __importDefault(require("mongoose"));
const redisClient_1 = require("../../utils/redisClient");
const constants_1 = require("../../constants");
class CustomerService {
    async signup(username, password, firstName, lastName, email, favoriteFood) {
        const existingCustomer = await customerModel_1.default.findOne({ email });
        if (existingCustomer) {
            throw new Error(constants_1.Constants.errorMsgs.customerExists);
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 2);
        const newCustomer = new customerModel_1.default({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            favoriteFood,
        });
        await newCustomer.save();
        return newCustomer;
    }
    async login(email, password) {
        const customer = await customerModel_1.default.findOne({ email });
        if (!customer) {
            throw new Error(constants_1.Constants.errorMsgs.customerNotFound);
        }
        const checkPassword = await bcrypt_1.default.compare(password, customer.password);
        if (!checkPassword) {
            throw new Error(constants_1.Constants.errorMsgs.invalidPassword);
        }
        const activeSession = await sessionModel_1.default.findOne({
            customerId: customer._id,
            isActive: true,
        });
        if (!activeSession) {
            const token = jsonwebtoken_1.default.sign({ email: customer.email, id: customer._id }, jwtMiddleware_1.secretKey, { expiresIn: "1h" });
            const session = new sessionModel_1.default({
                customerId: customer._id,
                isActive: true,
            });
            await (0, redisClient_1.connectToRedis)();
            let payload = {
                customerId: customer.id,
                deviceID: "12345",
                IP_Address: "127.0.0.1:8765",
                isActive: true,
            };
            const redisKey = `customer:${payload.customerId}`;
            await (0, redisClient_1.setToRedis)(redisKey, JSON.stringify(payload));
            await session.save();
            return token;
        }
        else {
            return { message: constants_1.Constants.errorMsgs.customerNotFound };
        }
    }
    async getProfile(email) {
        try {
            const customer = await customerModel_1.default.findOne({ email });
            if (!customer) {
                throw new Error(constants_1.Constants.errorMsgs.customerNotFound);
            }
            return customer;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.customerNotFound);
        }
    }
    async updateProfile(email, customerData) {
        try {
            if (customerData.password) {
                const hashedPassword = await bcrypt_1.default.hash(customerData.password, 5);
                customerData.password = hashedPassword;
            }
            const updatedCustomerProfile = await customerModel_1.default.findOneAndUpdate({ email: email }, { $set: customerData }, { new: true });
            return updatedCustomerProfile;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.updateProfileFailed);
        }
    }
    async deleteProfile(email) {
        try {
            const deleteCustomerProfile = await customerModel_1.default.findOneAndDelete({ email });
            return deleteCustomerProfile;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.deleteProfileFailed);
        }
    }
    async forgetPassword(email, favoriteFood, newPassword) {
        try {
            const customer = await customerModel_1.default.findOne({ email });
            if (!customer) {
                return { success: false, message: constants_1.Constants.errorMsgs.customerNotFound };
            }
            if (favoriteFood === customer.favoriteFood) {
                const hashedPassword = await bcrypt_1.default.hash(newPassword, 5);
                customer.password = hashedPassword;
                await customer.save();
                const token = jsonwebtoken_1.default.sign({ email: customer.email }, jwtMiddleware_1.secretKey);
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
    async logout(email) {
        try {
            const customer = await customerModel_1.default.findOne({ email });
            const cid = customer?.id;
            const client = (0, redis_1.createClient)();
            client.on("error", (error) => console.log("error"));
            await (0, redisClient_1.connectToRedis)();
            const redisKey = `customer:${cid}`;
            const cachedData = await (0, redisClient_1.getFromRedis)(redisKey);
            if (cachedData) {
                const customerData = JSON.parse(cachedData);
                customerData.isActive = false;
                await (0, redisClient_1.setToRedis)(redisKey, JSON.stringify(customerData));
                return { success: true };
            }
            else {
                await sessionModel_1.default.findOneAndUpdate({
                    customerId: mongoose_1.default.Types.ObjectId.createFromHexString(cid),
                    isActive: true,
                }, { $set: { isActive: false } });
                return { success: true };
            }
        }
        catch (error) {
            console.log(error);
            return { success: false };
        }
    }
}
exports.default = new CustomerService();
//# sourceMappingURL=profileServices.js.map