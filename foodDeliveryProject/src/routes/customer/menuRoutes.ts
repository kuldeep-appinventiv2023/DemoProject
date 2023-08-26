import express from 'express';
import { authMiddleware } from '../../middleware/jwtMiddleware';
import { adminAuthMiddleware } from '../../middleware/adminJwtMiddleware';
import MenuController from '../../controller/customer/menuController';

const customerMenuRouter = express.Router();

customerMenuRouter.get('/getAllMenuItems', authMiddleware, MenuController.getAllMenuItems);
customerMenuRouter.get('/getMenuItemById/:id', authMiddleware, MenuController.getMenuItemById);
customerMenuRouter.get('/getMenuItemsByRestaurantName', authMiddleware, MenuController.getMenuItemsByRestaurantName);
customerMenuRouter.get('/getMenuItemsByCategory', authMiddleware, MenuController.getMenuItemsByCategory);

export default customerMenuRouter;
