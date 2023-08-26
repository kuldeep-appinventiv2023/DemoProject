import mongoose from "mongoose";
import { Document } from "mongoose";

interface Admin extends Document {
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    contactNumber : String,
    email : String,
    profileImage : Buffer,
    superAdminEmail : String,
    created_at: Date,
    updated_at : Date
}

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String},
    email: { type: String, required: true },
    profileImage: { type: Buffer},
    superAdminEmail: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Admin = mongoose.model('admin', adminSchema);
console.log('Admin model created...');
module.exports = Admin;
export default mongoose.model<Admin>('admin', adminSchema);
