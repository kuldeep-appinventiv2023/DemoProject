import mongoose from "mongoose";
import { Document } from "mongoose";

interface Restaurant extends Document {
    restaurantId: number;
    categoryId: mongoose.Types.ObjectId;
    restaurantName: string;
    countryCode: number;
    city: string;
    address: string;
    longitude:number;
    latitude: number;
    cuisines: string;
    hasOnlineDelivery: string;
    aggregateRating: number;
}

const restaurantSchema = new mongoose.Schema<Restaurant>({
    restaurantId: { type: Number, required: true },
    restaurantName: { type: String, required: true },
    countryCode: { type: Number, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    longitude: { type: Number },
    latitude: { type: Number },
    cuisines: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    hasOnlineDelivery: { type: String },
    aggregateRating: { type: Number },
});

const RestaurantModel = mongoose.model<Restaurant>('restaurant', restaurantSchema);
console.log('Restaurant model created...');
export default RestaurantModel;
