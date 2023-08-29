"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const restaurentController_1 = __importDefault(require("../../controller/customer/restaurentController"));
const customerRestaurantRouter = express_1.default.Router();
customerRestaurantRouter.get('/findRestaurant', jwtMiddleware_1.authMiddleware, restaurentController_1.default.findRestaurantbyFilter);
customerRestaurantRouter.get('/viewAllRestaurant', jwtMiddleware_1.authMiddleware, restaurentController_1.default.getAllResturant);
customerRestaurantRouter.get('/viewRestaurantById', jwtMiddleware_1.authMiddleware, restaurentController_1.default.getRestaurantById);
customerRestaurantRouter.get('/viewRestaurantByName', jwtMiddleware_1.authMiddleware, restaurentController_1.default.getRestaurantByName);
customerRestaurantRouter.get('/viewRestaurantByCityName', jwtMiddleware_1.authMiddleware, restaurentController_1.default.getRestaurantByCityName);
customerRestaurantRouter.get('/viewRestaurantByCategory', jwtMiddleware_1.authMiddleware, restaurentController_1.default.getRestaurantsByCategory);
exports.default = customerRestaurantRouter;
//# sourceMappingURL=restaurantRoutes.js.map