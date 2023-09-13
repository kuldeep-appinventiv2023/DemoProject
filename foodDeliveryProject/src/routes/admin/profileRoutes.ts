import express from 'express';
import { adminAuthMiddleware } from '../../middleware/adminJwtMiddleware';
import AdminProfileController from '../../controller/admin/profileController';
const adminRouter = express.Router();

adminRouter.post('/adminLogin', AdminProfileController.login);
adminRouter.get('/viewAdminProfile', adminAuthMiddleware, AdminProfileController.getProfile);
adminRouter.patch('/updateAdminProfile', adminAuthMiddleware, AdminProfileController.updateProfile);
adminRouter.delete('/deleteAdminProfile', adminAuthMiddleware, AdminProfileController.deleteProfile);
adminRouter.post('/forgetAdminPassword', adminAuthMiddleware, AdminProfileController.forgetPassword);

export default adminRouter;
