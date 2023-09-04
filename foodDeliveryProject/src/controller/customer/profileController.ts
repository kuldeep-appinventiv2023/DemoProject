import { Request, Response } from "express";
import { sendVerifyMail } from "../../services/customer/emailService";
import CustomerService from '../../services/customer/profileServices';
import { Constants } from '../../constants';

class CustomerController {
    async signup(req: Request, res: Response) {
        const { username, password, firstName, lastName, email, favoriteFood } = req.body;

        try {
            const newCustomer = await CustomerService.signup(username, password, firstName, lastName, email, favoriteFood);
            sendVerifyMail(firstName, email, newCustomer._id);

            res.status(201).json({
                success: true,
                message: Constants.successMsgs.customerRegistered,
                customer: newCustomer,
            });
        } 
        catch (error: any) {
            console.log(error);
            if (error.message === Constants.errorMsgs.customerExists) {
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: Constants.errorMsgs.somethingWentWrong });
            }
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const result = await CustomerService.login(email, password);
            if(result.customer){
                res.status(200).json({ success: true, message: Constants.successMsgs.loginSuccess, result });
            }
            else {
                res.status(400).json({ success: false, message: Constants.errorMsgs.alreadyLoggedIn });
            }
        } catch (error) {
          console.log(error);
            res.status(401).json({ success: false, message: Constants.errorMsgs.loginFailed });
        }
    }

    async getProfile(req: Request, res: Response) {
        const email = req.body.email;

        try {
            const customer = await CustomerService.getProfile(email);
            res.status(200).json({ success: true, customer });
        } catch (error) {
          console.log(error);
          res.status(401).json({ success: false, message: Constants.errorMsgs.customerNotFound });
        }
    }

    async updateProfile(req: Request, res: Response) {
        const customerData = req.body;

        try {
            const email = req.body.email;
            const updatedCustomerProfile = await CustomerService.updateProfile(email, customerData);

            if (!updatedCustomerProfile) {
                return res.status(404).json({ success: false, message: Constants.errorMsgs.customerNotFound });
            }

            res.status(200).json({ success: true, message: Constants.successMsgs.profileUpdated, customer: updatedCustomerProfile });
        } catch (error) {
          console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.updateProfileFailed });
        }
    }

    async deleteProfile(req: Request, res: Response) {
        const email = req.body.email;

        try {
            const deleteCustomerProfile = await CustomerService.deleteProfile(email);

            if (!deleteCustomerProfile) {
                return res.status(404).json({ success: false, message: Constants.errorMsgs.customerNotFound });
            }

            res.status(200).json({ success: true, message: Constants.successMsgs.profileDeleted, deletedCustomer: deleteCustomerProfile });
        } catch (error) {
          console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.deleteProfileFailed });
        }
    }

    async forgetPassword(req: Request, res: Response) {
        const email = req.body.email;
        const {favoriteFood, newPassword } = req.body;
        try {
            const result = await CustomerService.forgetPassword(email, favoriteFood, newPassword);

            if (result.success) {
                res.status(200).json({ success: true, message: Constants.successMsgs.passwordUpdated, token: result.token });
            } else {
                res.status(404).json({ success: false, message: Constants.errorMsgs.resetPasswordFailed });
            }
        } catch (error) {
          console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.somethingWentWrong });
        }
    }

    async customerLogout(req: Request, res: Response) {
        const email = req.body.email;

        try {
            const result = await CustomerService.logout(email);

            if (result.success) {
                res.status(200).json({ success: true, message: Constants.successMsgs.logoutSuccess });
            } else {
                res.status(500).json({ success: false, message: Constants.errorMsgs.logoutFailed });
            }
        } catch (error) {
          console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.somethingWentWrong });
        }
    }
}

export default new CustomerController();
