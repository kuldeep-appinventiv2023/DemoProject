"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderServices_1 = __importDefault(require("../../services/customer/orderServices"));
const constants_1 = require("../../constants");
class OrderController {
    async placeOrder(req, res) {
        try {
            const { customerId, cartId, shippingAddress } = req.body;
            const result = await orderServices_1.default.placeOrder(customerId, cartId, shippingAddress);
            res.status(201).json({
                success: true,
                message: constants_1.Constants.successMsgs.ORDER_PLACED_SUCCESS,
                order: result,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ERROR_PLACING_ORDER });
        }
    }
    async getAllOrders(req, res) {
        try {
            const customerId = req.body;
            const orders = await orderServices_1.default.getAllOrders(customerId);
            return res.status(200).json(orders);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ERROR_FETCHING_ORDERS });
        }
    }
    async getOrderById(req, res) {
        try {
            const customerId = req.body;
            const orderId = req.params.orderId;
            const order = await orderServices_1.default.getOrderById(customerId, orderId);
            if (!order) {
                return res.status(404).json({ message: constants_1.Constants.errorMsgs.ORDER_NOT_FOUND });
            }
            return res.status(200).json(order);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ERROR_FETCHING_ORDERS });
        }
    }
    async cancelOrder(req, res) {
        try {
            const customerId = req.body;
            const orderId = req.params.orderId;
            const isCancelled = await orderServices_1.default.cancelOrder(customerId, orderId);
            if (!isCancelled) {
                return res.status(404).json({ message: constants_1.Constants.errorMsgs.ORDER_NOT_FOUND });
            }
            return res.status(200).json({ message: constants_1.Constants.successMsgs.ORDER_CANCELLED_SUCCESS });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: constants_1.Constants.errorMsgs.ERROR_CANCELLING_ORDER });
        }
    }
}
exports.default = new OrderController();
//# sourceMappingURL=orderController.js.map