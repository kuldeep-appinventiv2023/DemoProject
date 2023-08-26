import mongoose from "mongoose";
import { Document } from "mongoose";

interface Address {
    houseNo: string;
    streetNo: number;
    landmark: string;
    city: string;
    state: string;
    pinCode: number;
}

interface Customer extends Document {
    username : String,
    firstName : String,
    lastName : String,
    password : String,
    email : String,
    contactNumber : String,
    DOB : Date,
    gender : String,
    profileImage : Buffer,
    favoriteFood : String,
    customerAddress: Address;
    verified : boolean,
    created_at: Date,
    updated_at : Date
}

const addressSchema = new mongoose.Schema<Address>({
    houseNo: { type: String, required: true },
    streetNo: { type: Number, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: Number, required: true }
});

const customerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String},
    DOB: { type: Date},
    gender: { type: String},
    profileImage: { type: Buffer},
    favoriteFood: { type: String, required: true },
    customerAddress: { type: addressSchema },
    verified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Customer = mongoose.model('customer', customerSchema);
console.log('Customer model created...');
module.exports = Customer;
export default mongoose.model<Customer>('customer', customerSchema);
