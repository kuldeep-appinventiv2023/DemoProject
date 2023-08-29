"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminJwtMiddleware_1 = require("../../middleware/adminJwtMiddleware");
const restaurantController_1 = __importDefault(require("../../controller/admin/restaurantController"));
const adminRestaurantRouter = express_1.default.Router();
adminRestaurantRouter.post('/addRestaurant', adminJwtMiddleware_1.adminAuthMiddleware, restaurantController_1.default.add);
adminRestaurantRouter.patch('/updateRestaurant/:id', adminJwtMiddleware_1.adminAuthMiddleware, restaurantController_1.default.updateById);
adminRestaurantRouter.delete('/deleteRestaurant/:id', adminJwtMiddleware_1.adminAuthMiddleware, restaurantController_1.default.deleteById);
exports.default = adminRestaurantRouter;
//# sourceMappingURL=restaurantRoutes.js.map