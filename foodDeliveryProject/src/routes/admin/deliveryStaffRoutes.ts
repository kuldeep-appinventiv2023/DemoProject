import express from 'express';
import { adminAuthMiddleware } from '../../middleware/adminJwtMiddleware';
import DeliveryStaffController from '../../controller/admin/deliveryStaffController';
const adminDeliveryStaffRouter = express.Router();

adminDeliveryStaffRouter.post('/addDeliveryStaff', adminAuthMiddleware, DeliveryStaffController.add);
adminDeliveryStaffRouter.get('/viewAllDeliveryStaff', adminAuthMiddleware, DeliveryStaffController.getAll);
adminDeliveryStaffRouter.get('/viewDeliveryStaffById/:id', adminAuthMiddleware, DeliveryStaffController.getById);
adminDeliveryStaffRouter.patch('/updateDeliveryStaff/:id', adminAuthMiddleware, DeliveryStaffController.update);
adminDeliveryStaffRouter.delete('/deleteDeliveryStaff/:id', adminAuthMiddleware, DeliveryStaffController.delete);

export default adminDeliveryStaffRouter;
