import express from "express";
import { authMiddleware } from "../../middleware/jwtMiddleware";
import { deliveryStaffMiddleware } from "../../middleware/deliveryStaffMiddleware";
import OrderController from "../../controller/customer/orderController";

const orderRouter = express.Router();

orderRouter.post("/place-order", authMiddleware, OrderController.placeOrder);
orderRouter.get("/customers/:customerId/orders", authMiddleware, OrderController.getAllOrders);
orderRouter.get("/orders/:orderId", authMiddleware, OrderController.getOrderById);
orderRouter.delete("/cancelOrders/:orderId", authMiddleware, OrderController.cancelOrder);

orderRouter.post("/orderDelivered/:orderId", deliveryStaffMiddleware, OrderController.orderDelivery);


export default orderRouter;
