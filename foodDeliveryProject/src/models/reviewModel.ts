import mongoose, { Document, Schema } from "mongoose";

interface Review extends Document {
    customerId: mongoose.Types.ObjectId; 
    orderId: mongoose.Types.ObjectId; 
    restaurantId: mongoose.Types.ObjectId; 
    staffId: Schema.Types.ObjectId;
    restaurantComment: string;
    deliveryComment: string;
    reviewDate: Date;
}

const reviewSchema = new mongoose.Schema<Review>({
    customerId: { type: Schema.Types.ObjectId, ref: 'customers', required: true }, // Reference to Customer model
    orderId: { type: Schema.Types.ObjectId, ref: 'orders', required: true }, // Reference to Orders model
    restaurantId: { type: Schema.Types.ObjectId, ref: 'restaurants', required: true }, // Reference to Restaurant model
    staffId: { type: Schema.Types.ObjectId, ref: 'deliveryStaffs', required: true }, // Reference to DeliveryStaff model
    restaurantComment: { type: String },
    deliveryComment: { type: String },
    reviewDate: { type: Date, default:Date.now }
});

const Review = mongoose.model<Review>('review', reviewSchema);
console.log('Review model created...');
export default Review;
