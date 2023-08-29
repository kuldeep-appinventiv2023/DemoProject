"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthMiddleware = exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
exports.secretKey = "kuldeep@321";
async function adminAuthMiddleware(req, res, next) {
    let token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: constants_1.Constants.errorMsgs.tokenMissing });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, exports.secretKey);
        const adminEmail = decoded.email;
        if (adminEmail == "kuldeepprajapati697@gmail.com") {
            req.body.email = decoded.email;
            next();
        }
        else {
            return res.status(401).json({ message: constants_1.Constants.errorMsgs.adminUnauthorized });
        }
    }
    catch (error) {
        return res.status(401).json({ message: error });
    }
}
exports.adminAuthMiddleware = adminAuthMiddleware;
//# sourceMappingURL=adminJwtMiddleware.js.map