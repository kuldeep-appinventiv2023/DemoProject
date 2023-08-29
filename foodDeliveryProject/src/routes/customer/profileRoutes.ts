import express from 'express';
import { authMiddleware } from '../../middleware/jwtMiddleware';
import CustomerController from '../../controller/customer/profileController';
import verifyMail from '../../controller/customer/verifyMail';
const customerRouter = express.Router();

customerRouter.post('/customerSignup', CustomerController.signup);
customerRouter.get('/verify', verifyMail);
customerRouter.post('/customerLogin', CustomerController.login);
customerRouter.get('/viewCustomerProfile', authMiddleware, CustomerController.getProfile);
customerRouter.patch('/updateCustomerProfile', authMiddleware, CustomerController.updateProfile);
customerRouter.delete('/deleteCustomerProfile', authMiddleware, CustomerController.deleteProfile);
customerRouter.post('/forgetCustomerPassword', authMiddleware, CustomerController.forgetPassword);
customerRouter.post('/customerLogout', authMiddleware, CustomerController.customerLogout);

export default customerRouter;
