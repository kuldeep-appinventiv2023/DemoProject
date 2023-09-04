import mongoose from 'mongoose';
import { Document, Schema } from "mongoose";

interface DeliveryStaff extends Document {
    resturantId : mongoose.Types.ObjectId;
    orderId : mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    password: string;
    contactNumber: string;
    email: string;
    DOB: Date;
    gender: 'Male' | 'Female' | 'Other';
    isAvailable: boolean;
}

const deliveryStaffSchema = new mongoose.Schema({
    resturantId: { type: Schema.Types.ObjectId, ref: "restaurants"},
    orderId: { type: Schema.Types.ObjectId, ref: "orders"},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    DOB: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other']},
    isAvailable: { type: Boolean, default: true },
});

const DeliveryStaff = mongoose.model('deliveryStaff', deliveryStaffSchema);
console.log('DeliveryStaff model created...');
module.exports = DeliveryStaff;
export default mongoose.model<DeliveryStaff>('deliveryStaff', deliveryStaffSchema);
