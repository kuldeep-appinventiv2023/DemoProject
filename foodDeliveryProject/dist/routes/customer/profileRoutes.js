"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const profileController_1 = __importDefault(require("../../controller/customer/profileController"));
const verifyMail_1 = __importDefault(require("../../controller/customer/verifyMail"));
const customerRouter = express_1.default.Router();
customerRouter.post('/customerSignup', profileController_1.default.signup);
customerRouter.get('/verify', verifyMail_1.default);
customerRouter.post('/customerLogin', profileController_1.default.login);
customerRouter.get('/viewCustomerProfile', jwtMiddleware_1.authMiddleware, profileController_1.default.getProfile);
customerRouter.patch('/updateCustomerProfile', jwtMiddleware_1.authMiddleware, profileController_1.default.updateProfile);
customerRouter.delete('/deleteCustomerProfile', jwtMiddleware_1.authMiddleware, profileController_1.default.deleteProfile);
customerRouter.post('/forgetCustomerPassword', jwtMiddleware_1.authMiddleware, profileController_1.default.forgetPassword);
customerRouter.post('/customerLogout', jwtMiddleware_1.authMiddleware, profileController_1.default.customerLogout);
exports.default = customerRouter;
//# sourceMappingURL=profileRoutes.js.map