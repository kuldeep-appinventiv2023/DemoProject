import Cart from "../../models/cartModel";
import  Customer  from "../../models/customerModel";
import Orders from "../../models/orderModel";
import { sendOrderMailWithOTP, generateOTP } from "../../services/customer/emailService";
import { Constants } from "../../constants";

class OrderService {
  async placeOrder(customerId, cartId,  shippingAddress) {
    try {
      let cart: any = await Cart.findOne({ _id : cartId  });
      let customer:any = await Customer.findOne({_id: customerId});
      if (!cart) {
        return { status: 404, message: Constants. errorMsgs.CART_NOT_FOUND };
      }

      if (cart.items.length === 0) {
        return { status: 400, message: Constants. errorMsgs.CART_EMPTY };
      }

      const orderItems = cart.items.map((item) => ({
        item: cart.items,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }));

      const orderTotal = cart.cartTotal;

      const newOrder = new Orders({
        cartId,
        items: orderItems,
        orderTotal,
        shippingAddress,
      });

      await newOrder.save();
      await Cart.deleteOne({ _id: cart._id });

      const otp =  generateOTP();
      sendOrderMailWithOTP(customer.firstName, customer.email, otp);


      return newOrder;
    } catch (error) {
      console.error(error);
      return { status: 500, message: Constants. errorMsgs.ERROR_PLACING_ORDER };
    }
  }

  async getAllOrders(customerId) {
    try {
      const orders = await Orders.find({ customerId });
      return orders;
    } catch (error) {
      console.error(error);
      throw new Error(Constants.errorMsgs.ERROR_FETCHING_ORDERS);
    }
  }

  async getOrderById(customerId, orderId) {
    try {
      const order = await Orders.findOne({ _id: orderId, customerId });

      if (!order) {
        return null;
      }

      return order;
    } catch (error) {
      console.error(error);
      throw new Error(Constants. errorMsgs.ERROR_FETCHING_ORDERS);
    }
  }

  async cancelOrder(customerId, orderId) {
    try {
      const order = await Orders.findOneAndUpdate({ _id: orderId, customerId }, { status: 'Cancelled' },{ new: true });

      if (!order) {
        return ({ message:  Constants.errorMsgs.ORDER_NOT_FOUND });
      }
      else{
        return order;
      }
    } catch (error) {
      console.error(error);
      throw new Error(Constants.errorMsgs.ERROR_CANCELLING_ORDER);
    }
  }

  async orderDelivered(customerId, orderId) {
    try {
      const order = await Orders.findOneAndUpdate({ 
        _id: orderId, customerId },
        { OrderStatus: 'delivered' },
        { new: true }
      );
      
      if (!order) {
        return null; 
      }
      else{
        return order;
      }  
    } 
    catch (error) {
      console.error(error);
      throw new Error(Constants.errorMsgs.ERROR_DELIVERING_ORDER);
    }
  }
  
}

export default new OrderService();
