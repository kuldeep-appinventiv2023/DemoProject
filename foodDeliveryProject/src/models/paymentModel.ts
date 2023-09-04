import mongoose, { Document, Schema } from "mongoose";

enum PaymentMethod {
    COD = "COD",
    UPI = "UPI",
    Card = "Card"
}

enum PaymentStatus {
    Pending = "pending",
    Accepted = "accepted",
    Rejected = "rejected"
}

interface Payment extends Document {
    paymentId: number;
    customerId: Schema.Types.ObjectId; 
    orderId: Schema.Types.ObjectId;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    paymentDate: Date;
}

const paymentSchema = new mongoose.Schema<Payment>({
    paymentId: { type: Number, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'customers', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'orders', required: true },
    paymentMethod: { type: String, enum: Object.values(PaymentMethod), required: true },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), required: true },
    paymentDate: { type: Date , default:Date.now}
});

const Payment = mongoose.model<Payment>('payment', paymentSchema);
console.log('Payment model created...');
export default Payment;
