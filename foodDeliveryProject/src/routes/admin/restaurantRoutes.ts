import express from 'express';
import { adminAuthMiddleware } from '../../middleware/adminJwtMiddleware';
import RestaurantController from '../../controller/admin/restaurantController';
const adminRestaurantRouter = express.Router();

adminRestaurantRouter.post('/addRestaurant', adminAuthMiddleware, RestaurantController.add);

adminRestaurantRouter.patch('/updateRestaurant/:id', adminAuthMiddleware, RestaurantController.updateById);

adminRestaurantRouter.delete('/deleteRestaurant/:id', adminAuthMiddleware, RestaurantController.deleteById);

export default adminRestaurantRouter;