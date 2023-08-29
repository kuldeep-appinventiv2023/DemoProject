import express from 'express';
import { authMiddleware } from '../../middleware/jwtMiddleware';
import MenuController from '../../controller/customer/menuController';

const customerMenuRouter = express.Router();

customerMenuRouter.get('/getAllMenuItems', authMiddleware, MenuController.getAllMenuItems);
customerMenuRouter.get('/getMenuItemById/:id', authMiddleware, MenuController.getMenuItemById);
customerMenuRouter.get('/getMenuItemsByRestaurantName:restaurantName', authMiddleware, MenuController.getMenuItemsByRestaurantName);
customerMenuRouter.get('/getMenuItemsByCategory', authMiddleware, MenuController.getMenuItemsByCategory);

export default customerMenuRouter;
