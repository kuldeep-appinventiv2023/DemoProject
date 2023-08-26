import mongoose from "mongoose";
import { Document } from "mongoose";

interface Session extends Document {
    customerId : object,
    deviceId :  String,
    deviceType : String,
    isActive : boolean   
}
const sessionSchema = new mongoose.Schema({
  customerId: { type: Object, required: true },
  deviceId: {type: String},
  deviceType: { type: String},
  isActive: { type: Boolean, required: true , default : false}
});

const Session = mongoose.model('session', sessionSchema);
console.log('Session model created...');
module.exports = Session;
export default mongoose.model<Session>('session', sessionSchema);



