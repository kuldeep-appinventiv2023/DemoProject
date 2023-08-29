"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminJwtMiddleware_1 = require("../../middleware/adminJwtMiddleware");
const menuController_1 = __importDefault(require("../../controller/admin/menuController"));
const AdminMenuRouter = express_1.default.Router();
AdminMenuRouter.post('/createMenuItem', adminJwtMiddleware_1.adminAuthMiddleware, menuController_1.default.create);
AdminMenuRouter.patch('/updateMenuItem/:id', adminJwtMiddleware_1.adminAuthMiddleware, menuController_1.default.update);
AdminMenuRouter.delete('/deleteMenuItem/:id', adminJwtMiddleware_1.adminAuthMiddleware, menuController_1.default.delete);
exports.default = AdminMenuRouter;
//# sourceMappingURL=menuRoutes.js.map