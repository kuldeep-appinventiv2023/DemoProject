import { Request, Response } from 'express';
import DeliveryStaffService from '../../services/admin/deliveryStaffServices';
import { Constants } from '../../constants';

class DeliveryStaffController {
    async add(req: Request, res: Response) {
        const {firstName, lastName, password, contactNumber,  deliveryEmail} = req.body;
        try {
            const newDeliveryStaff = await DeliveryStaffService.addDeliveryStaff(firstName, lastName, password, contactNumber,  deliveryEmail);
            res.status(201).json({ success: true, message: Constants.successMsgs.staffAdded, deliveryStaff: newDeliveryStaff });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorAddingStaff });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const token = await DeliveryStaffService.login(email, password);
            res.status(200).json({ success: true, token });
        } catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: Constants.errorMsgs.loginFailed });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const deliveryStaffList = await DeliveryStaffService.getAllDeliveryStaff();
            res.status(200).json({ success: true, deliveryStaffList });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.somethingWentWrong });
        }
    }

    async getById(req: Request, res: Response) {
        const staffId = req.params.id;

        try {
            const deliveryStaff = await DeliveryStaffService.getDeliveryStaffById(Number(staffId));
            res.status(200).json({ success: true, deliveryStaff });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.somethingWentWrong });
        }
    }

    async update(req: Request, res: Response) {
        const staffId = req.params.id;
        const updateData = req.body;

        try {
            const updatedDeliveryStaff = await DeliveryStaffService.updateDeliveryStaff(Number(staffId), updateData);
            res.status(200).json({ success: true, message: Constants.successMsgs.staffUpdated, deliveryStaff: updatedDeliveryStaff });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorUpdatingStaff });
        }
    }

    async delete(req: Request, res: Response) {
        const staffId = req.params.id;

        try {
            await DeliveryStaffService.deleteDeliveryStaff(Number(staffId));
            res.status(200).json({ success: true, message: Constants.successMsgs.staffDeleted });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorDeletingStaff });
        }
    }
}

export default new DeliveryStaffController();
