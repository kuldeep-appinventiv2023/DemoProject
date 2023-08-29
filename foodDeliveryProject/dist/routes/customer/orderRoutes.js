"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const orderController_1 = __importDefault(require("../../controller/customer/orderController"));
const orderRouter = express_1.default.Router();
orderRouter.post("/place-order", jwtMiddleware_1.authMiddleware, orderController_1.default.placeOrder);
orderRouter.get("/customers/:customerId/orders", jwtMiddleware_1.authMiddleware, orderController_1.default.getAllOrders);
orderRouter.get("/orders/:orderId", jwtMiddleware_1.authMiddleware, orderController_1.default.getOrderById);
orderRouter.delete("/cancelOrders/:orderId", jwtMiddleware_1.authMiddleware, orderController_1.default.cancelOrder);
exports.default = orderRouter;
//# sourceMappingURL=orderRoutes.js.map