"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminJwtMiddleware_1 = require("../../middleware/adminJwtMiddleware");
const deliveryStaffController_1 = __importDefault(require("../../controller/admin/deliveryStaffController"));
const adminDeliveryStaffRouter = express_1.default.Router();
adminDeliveryStaffRouter.post('/addDeliveryStaff', adminJwtMiddleware_1.adminAuthMiddleware, deliveryStaffController_1.default.add);
adminDeliveryStaffRouter.get('/viewAllDeliveryStaff', adminJwtMiddleware_1.adminAuthMiddleware, deliveryStaffController_1.default.getAll);
adminDeliveryStaffRouter.get('/viewDeliveryStaffById/:id', adminJwtMiddleware_1.adminAuthMiddleware, deliveryStaffController_1.default.getById);
adminDeliveryStaffRouter.patch('/updateDeliveryStaff/:id', adminJwtMiddleware_1.adminAuthMiddleware, deliveryStaffController_1.default.update);
adminDeliveryStaffRouter.delete('/deleteDeliveryStaff/:id', adminJwtMiddleware_1.adminAuthMiddleware, deliveryStaffController_1.default.delete);
exports.default = adminDeliveryStaffRouter;
//# sourceMappingURL=deliveryStaffRoutes.js.map