import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DeliveryStaff from '../../models/deliveryStaffModel';
import { Constants } from '../../constants';
import { deliverySecretKey } from "../../middleware/deliveryStaffMiddleware";

class DeliveryStaffService {
    async addDeliveryStaff(firstName: string, lastName: string, password: any, contactNumber: string,  email: string) {
        
        const existingStaff = await DeliveryStaff.findOne({ email });

        if (existingStaff) {
            throw new Error(Constants.errorMsgs.staffExists);
        }

        const hashedPassword = await bcrypt.hash(password, 2);

        const newDeliveryStaff = new DeliveryStaff({
            firstName,
            lastName,
            password: hashedPassword,
            contactNumber,
            email,
        });
        await newDeliveryStaff.save();
        return newDeliveryStaff;
    }

    async login(email: string, password: string) {
        const deliveryStaff : any = await DeliveryStaff.findOne({ email });

        if (!deliveryStaff) {
            throw new Error(Constants.errorMsgs.deliveryStaffNotFound);
        }

        const checkPassword = await bcrypt.compare(password, deliveryStaff.password);
        if (!checkPassword) {
            throw new Error(Constants.errorMsgs.invalidPassword);
        }

        const token = jwt.sign({ email: deliveryStaff.email, id: deliveryStaff._id }, deliverySecretKey, {expiresIn: '1h'});
        return token;
    }

    async getAllDeliveryStaff() {
        const allDeliveryStaff = await DeliveryStaff.find();
        return allDeliveryStaff;
    }

    async getDeliveryStaffById(staffId: number) {
        const deliveryStaff = await DeliveryStaff.findOne({ staffId });
        return deliveryStaff;
    }

    async updateDeliveryStaff(staffId: number, updateData: any) {
        const updatedDeliveryStaff = await DeliveryStaff.findOneAndUpdate({ staffId }, updateData, { new: true });
        return updatedDeliveryStaff;
    }

    async deleteDeliveryStaff(staffId: number) {
        const deletedDeliveryStaff = await DeliveryStaff.findOneAndDelete({ staffId });
        return deletedDeliveryStaff;
    }
}

export default new DeliveryStaffService();
