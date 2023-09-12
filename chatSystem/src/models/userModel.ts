import mongoose from "mongoose";
import { Document } from "mongoose";

interface User extends Document {
  firstname: string;
  lastname: string;
  password: string;
  phoneNo: string;
  created_at: Date;
}

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  password: { type: String, required: true},
  phoneNo: { type: String, required: true},
  created_at: { type: String, default: Date.now}
});

const User = mongoose.model('user', userSchema);
console.log('User model created...');
module.exports = User;
export default mongoose.model<User>('user', userSchema);
