"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminJwtMiddleware_1 = require("../../middleware/adminJwtMiddleware");
const profileController_1 = __importDefault(require("../../controller/admin/profileController"));
const adminRouter = express_1.default.Router();
adminRouter.post('/adminLogin', profileController_1.default.login);
adminRouter.get('/viewAdminProfile', adminJwtMiddleware_1.adminAuthMiddleware, profileController_1.default.getProfile);
adminRouter.patch('/updateAdminProfile', adminJwtMiddleware_1.adminAuthMiddleware, profileController_1.default.updateProfile);
adminRouter.delete('/deleteAdminProfile', adminJwtMiddleware_1.adminAuthMiddleware, profileController_1.default.deleteProfile);
adminRouter.post('/forgetAdminPassword', adminJwtMiddleware_1.adminAuthMiddleware, profileController_1.default.forgetPassword);
exports.default = adminRouter;
//# sourceMappingURL=profileRoutes.js.map