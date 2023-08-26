import express from 'express';
import { authMiddleware } from '../../middleware/jwtMiddleware';
import RestaurantController from '../../controller/customer/restaurentController';         
const customerRestaurantRouter = express.Router();

customerRestaurantRouter.get('/findRestaurant', authMiddleware, RestaurantController.findRestaurantbyFilter);
customerRestaurantRouter.get('/viewAllRestaurant', authMiddleware, RestaurantController.getAllResturant);
customerRestaurantRouter.get('/viewRestaurantById', authMiddleware, RestaurantController.getRestaurantById);
customerRestaurantRouter.get('/viewRestaurantByName', authMiddleware, RestaurantController.getRestaurantByName);
customerRestaurantRouter.get('/viewRestaurantByCityName', authMiddleware, RestaurantController.getRestaurantByCityName);

export default customerRestaurantRouter;
