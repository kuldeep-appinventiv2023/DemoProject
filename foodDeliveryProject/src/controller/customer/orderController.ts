import { Request, Response } from "express";
import OrderService from "../../services/customer/orderServices";
import { Constants } from "../../constants";

class OrderController {
  async placeOrder(req: Request, res: Response) {
    try {
      const {customerId, cartId,  shippingAddress } = req.body;

      const result = await OrderService.placeOrder(customerId, cartId,  shippingAddress );

      res.status(201).json({
        success: true,
        message: Constants.successMsgs.ORDER_PLACED_SUCCESS,
        order: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants. errorMsgs.ERROR_PLACING_ORDER });
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const customerId = req.body;

      const orders = await OrderService.getAllOrders(customerId);

      return res.status(200).json(orders);
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants. errorMsgs.ERROR_FETCHING_ORDERS });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const customerId = req.body;
      const orderId = req.params.orderId;

      const order = await OrderService.getOrderById(customerId, orderId);

      if (!order) {
        return res.status(404).json({ message: Constants.errorMsgs.ORDER_NOT_FOUND });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants.errorMsgs.ERROR_FETCHING_ORDERS });
    }
  }

  async cancelOrder(req: Request, res: Response) {
    try {
      const customerId = req.body;
      const orderId = req.params.orderId;

      const isCancelled = await OrderService.cancelOrder(customerId, orderId);

      if (!isCancelled) {
        return res.status(404).json({ message: Constants.errorMsgs.ORDER_NOT_FOUND});
      }

      return res.status(200).json({ message: Constants.successMsgs.ORDER_CANCELLED_SUCCESS });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: Constants.errorMsgs.ERROR_CANCELLING_ORDER });
    }
  }

}

export default new OrderController();
