"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const menuController_1 = __importDefault(require("../../controller/customer/menuController"));
const customerMenuRouter = express_1.default.Router();
customerMenuRouter.get('/getAllMenuItems', jwtMiddleware_1.authMiddleware, menuController_1.default.getAllMenuItems);
customerMenuRouter.get('/getMenuItemById/:id', jwtMiddleware_1.authMiddleware, menuController_1.default.getMenuItemById);
customerMenuRouter.get('/getMenuItemsByRestaurantName:restaurantName', jwtMiddleware_1.authMiddleware, menuController_1.default.getMenuItemsByRestaurantName);
customerMenuRouter.get('/getMenuItemsByCategory', jwtMiddleware_1.authMiddleware, menuController_1.default.getMenuItemsByCategory);
exports.default = customerMenuRouter;
//# sourceMappingURL=menuRoutes.js.map