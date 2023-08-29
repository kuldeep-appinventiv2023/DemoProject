"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartModel_1 = __importDefault(require("../../models/cartModel"));
const customerModel_1 = __importDefault(require("../../models/customerModel"));
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const emailService_1 = require("../../services/customer/emailService");
class OrderService {
    async placeOrder(customerId, cartId, shippingAddress) {
        try {
            let cart = await cartModel_1.default.findOne({ _id: cartId });
            let customer = await customerModel_1.default.findOne({ _id: customerId });
            if (!cart) {
                return { status: 404, message: "Cart not found" };
            }
            if (cart.items.length === 0) {
                return { status: 400, message: "Cart is empty" };
            }
            const orderItems = cart.items.map((item) => ({
                item: cart.items,
                quantity: item.quantity,
                unit_price: item.unit_price,
            }));
            const orderTotal = cart.cartTotal;
            const newOrder = new orderModel_1.default({
                cartId,
                items: orderItems,
                orderTotal,
                shippingAddress,
            });
            await newOrder.save();
            await cartModel_1.default.deleteOne({ _id: cart._id });
            (0, emailService_1.sendOrderMail)(customer.firstName, customer.email);
            return newOrder;
        }
        catch (error) {
            console.error(error);
            return { status: 500, message: "Error placing order" };
        }
    }
    async getAllOrders(customerId) {
        try {
            const orders = await orderModel_1.default.find({ customerId });
            return orders;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error fetching orders");
        }
    }
    async getOrderById(customerId, orderId) {
        try {
            const order = await orderModel_1.default.findOne({ _id: orderId, customerId });
            if (!order) {
                return null;
            }
            return order;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error fetching order");
        }
    }
    async cancelOrder(customerId, orderId) {
        try {
            const order = await orderModel_1.default.findOneAndUpdate({ _id: orderId, customerId }, { status: 'Cancelled' }, { new: true });
            if (!order) {
                return ({ message: 'Order not found or could not be cancelled' });
            }
            else {
                return order;
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Error cancelling order');
        }
    }
}
exports.default = new OrderService();
//# sourceMappingURL=orderServices.js.map