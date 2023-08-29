"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const redis_1 = require("redis");
const constants_1 = require("../constants");
exports.secretKey = "kuldeep@321";
async function authMiddleware(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: constants_1.Constants.errorMsgs.tokenMissing });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, exports.secretKey);
        const admin = await adminModel_1.default.findOne({ email: decoded.email });
        if (!admin) {
            const client = (0, redis_1.createClient)();
            client.on("error", (error) => console.log("error"));
            await client.connect();
            const customerId = decoded.id;
            const redisKey = `customer:${customerId}`;
            const cachedData = await client.get(`${redisKey}`);
            if (cachedData) {
                const customerData = JSON.parse(cachedData);
                if (customerData.isActive == true) {
                    req.body.customerId = decoded.id;
                    next();
                }
                else {
                    throw new Error(constants_1.Constants.errorMsgs.sessionExpired);
                }
            }
            else {
                throw new Error(constants_1.Constants.errorMsgs.sessionExpired);
            }
        }
        else {
            next();
        }
    }
    catch (error) {
        res.send(constants_1.Constants.errorMsgs.error);
        throw new Error(constants_1.Constants.errorMsgs.error);
    }
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=jwtMiddleware.js.map