import { Request, Response } from 'express';
import AdminServices from '../../services/admin/profileServices';
import { Constants } from '../../constants';

class AdminProfileController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const token = await AdminServices.loginAdmin(email, password);
            res.status(200).json({ success: true, token });
        } catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: Constants.errorMsgs.loginFailed });
        }
    }

    async getProfile(req: Request, res: Response) {
        const email = req.body.email;
        try {
            const admin = await AdminServices.getAdminProfile(email);
            res.send(admin);
        } catch (error) {
            console.log(error);
            res.status(401).send(error);
        }
    }

    async updateProfile(req: Request, res: Response) {
        const adminData = req.body;
        try {
            const email = req.body.email;
            const updatedAdminProfile = await AdminServices.updateAdminProfile(email, adminData);
            if (!updatedAdminProfile) {
                return res.status(404).json({ message: Constants.errorMsgs.adminNotFound });
            }
            else{
                res.status(200).json({ message: Constants.successMsgs.profileUpdated , updatedAdminProfile });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: Constants.errorMsgs.updateFailed });
        }
    }

    async deleteProfile(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const deleteAdminProfile = await AdminServices.deleteAdminProfile(email);
            if (!deleteAdminProfile) {
                return res.status(404).json({ message: Constants.errorMsgs.adminNotFound });
            }
            else {
                res.json({ message: Constants.successMsgs.profileDeleted, deleteAdminProfile });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: Constants.errorMsgs.deleteFailed });
        }
    }

    async forgetPassword(req: Request, res: Response) {
        const { email, superAdminEmail, newPassword } = req.body;
        const result = await AdminServices.resetAdminPassword(email, superAdminEmail, newPassword);
        if (result.success) {
            res.json({ message: result.message, token: result.token });
        } else {
            res.status(404).json({ message: result.message });
        }
    }
}

export default new AdminProfileController();
