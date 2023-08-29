"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const categoryController_1 = __importDefault(require("../../controller/customer/categoryController"));
const customerCategoryRouter = express_1.default.Router();
customerCategoryRouter.get('/viewAllCategories', jwtMiddleware_1.authMiddleware, categoryController_1.default.getAll);
customerCategoryRouter.get('/viewCategoryById/:id', jwtMiddleware_1.authMiddleware, categoryController_1.default.getById);
customerCategoryRouter.get('/viewCategoryByName', jwtMiddleware_1.authMiddleware, categoryController_1.default.getByName);
exports.default = customerCategoryRouter;
//# sourceMappingURL=categoryRoutes.js.map