"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const cartController_1 = __importDefault(require("../../controller/customer/cartController"));
const cartRouter = express_1.default.Router();
cartRouter.post('/addItemToCart', jwtMiddleware_1.authMiddleware, cartController_1.default.addToCart);
cartRouter.get('/get-cart', jwtMiddleware_1.authMiddleware, cartController_1.default.getCart);
cartRouter.put('/update-cart-item/:itemId', jwtMiddleware_1.authMiddleware, cartController_1.default.updateCartItem);
cartRouter.delete('/remove-cart-item/:itemId', jwtMiddleware_1.authMiddleware, cartController_1.default.removeCartItem);
exports.default = cartRouter;
//# sourceMappingURL=cartRoutes.js.map