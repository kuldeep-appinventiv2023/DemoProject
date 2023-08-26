// import Order from "../../models/orderModel";

// class OrdersService {
//   async createOrder(orderData) {
//     const newOrder = new Order(orderData);
//     return await newOrder.save();
//   }

//   async getOrdersForCustomer(customerId) {
//     return await Order.find({ customerId });
//   }

//   async getOrderById(orderId) {
//     return await Order.findById(orderId);
//   }

//   async cancelOrder(orderId) {
//     return await Order.findByIdAndDelete(orderId);
//   }
// }

// export default new OrdersService();
