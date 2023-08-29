import Cart from "../../models/cartModel";
import  Customer  from "../../models/customerModel";
import Orders from "../../models/orderModel";
import { sendOrderMail } from "../../services/customer/emailService";

class OrderService {
  async placeOrder(customerId, cartId,  shippingAddress) {
    try {
      let cart: any = await Cart.findOne({ _id : cartId  });
      let customer:any = await Customer.findOne({_id: customerId});
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

      const newOrder = new Orders({
        cartId,
        items: orderItems,
        orderTotal,
        shippingAddress,
      });

      await newOrder.save();
      await Cart.deleteOne({ _id: cart._id });
      sendOrderMail(customer.firstName, customer.email);
      return newOrder;
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Error placing order" };
    }
  }

  async getAllOrders(customerId) {
    try {
      const orders = await Orders.find({ customerId });
      return orders;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching orders");
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
      throw new Error("Error fetching order");
    }
  }

  async cancelOrder(customerId, orderId) {
    try {
      const order = await Orders.findOneAndUpdate({ _id: orderId, customerId }, { status: 'Cancelled' },{ new: true });

      if (!order) {
        return ({ message: 'Order not found or could not be cancelled' });
      }
      else{
        return order;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error cancelling order');
    }
  }

}

export default new OrderService();
