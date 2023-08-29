import DeliveryStaff from '../../models/deliveryStaffModel';

class DeliveryStaffService {
    async addDeliveryStaff(newDeliveryStaffData: any) {
        const newDeliveryStaff = new DeliveryStaff(newDeliveryStaffData);
        await newDeliveryStaff.save();
        return newDeliveryStaff;
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
