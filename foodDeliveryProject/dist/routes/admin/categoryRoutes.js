"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminJwtMiddleware_1 = require("../../middleware/adminJwtMiddleware");
const categoryController_1 = __importDefault(require("../../controller/admin/categoryController"));
const adminCategoryRouter = express_1.default.Router();
adminCategoryRouter.post('/addCategory', adminJwtMiddleware_1.adminAuthMiddleware, categoryController_1.default.add);
adminCategoryRouter.patch('/updateCategory/:id', adminJwtMiddleware_1.adminAuthMiddleware, categoryController_1.default.updateById);
adminCategoryRouter.delete('/deleteCategory/:id', adminJwtMiddleware_1.adminAuthMiddleware, categoryController_1.default.deleteById);
exports.default = adminCategoryRouter;
//# sourceMappingURL=categoryRoutes.js.map