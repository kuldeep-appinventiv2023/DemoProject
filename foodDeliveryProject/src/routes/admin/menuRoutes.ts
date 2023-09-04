import express from 'express';
import { adminAuthMiddleware } from '../../middleware/adminJwtMiddleware';
import MenuItemController from '../../controller/admin/menuController';

const AdminMenuRouter = express.Router();

AdminMenuRouter.post('/createMenuItem', adminAuthMiddleware, MenuItemController.create);
AdminMenuRouter.patch('/updateMenuItem/:id', adminAuthMiddleware, MenuItemController.update);
AdminMenuRouter.delete('/deleteMenuItem/:id', adminAuthMiddleware, MenuItemController.delete);

export default AdminMenuRouter;
