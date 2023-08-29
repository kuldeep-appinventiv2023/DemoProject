import mongoose from "mongoose";
import { Document } from "mongoose";

interface Restaurant extends Document {
    restaurantId: number;
    restaurantName: string;
    countryCode: number;
    City: string;
    Address: string;
    Locality: string;
    Longitude: number;
    Latitude: number;
    Cuisines: string;
    categoryId: mongoose.Types.ObjectId;
    averageCostForTwo: number;
    Currency: string;
    hasTableBooking: string;
    hasOnlineDelivery: string;
    priceRange: number;
    aggregateRating: number;
    ratingColor: string;
    ratingText: string;
    Votes: number;
}

const restaurantSchema = new mongoose.Schema<Restaurant>({
    restaurantId: { type: Number, required: true },
    restaurantName: { type: String, required: true },
    countryCode: { type: Number, required: true },
    City: { type: String, required: true },
    Address: { type: String, required: true },
    Locality: { type: String },
    Longitude: { type: Number },
    Latitude: { type: Number },
    Cuisines: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    averageCostForTwo: { type: Number },
    Currency: { type: String },
    hasTableBooking: { type: String },
    hasOnlineDelivery: { type: String },
    priceRange: { type: Number },
    aggregateRating: { type: Number },
    Votes: { type: Number },
});

const RestaurantModel = mongoose.model<Restaurant>('restaurant', restaurantSchema);
console.log('Restaurant model created...');
export default RestaurantModel;

// import mongoose from "mongoose";
// import { Document } from "mongoose";

// interface Address {
//     resturantNo: string;
//     streetNo: number;
//     landmark: string;
//     city: string;
//     state: string;
//     pinCode: number;
// }

// interface Resturant extends Document {
//     menuId : object;
//     resturantName : String;
//     resturantPhoneNo : String;
//     resturantPhoto : Buffer; 
//     openingTime : Date;
//     closingTime : Date;
//     Rating : number;
//     resturantAddress: Address;
    
//     created_at: Date,
//     updated_at : Date
// }

// const addressSchema = new mongoose.Schema<Address>({
//     resturantNo: { type: String, required: true },
//     streetNo: { type: Number, required: true },
//     landmark: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pinCode: { type: Number, required: true }
// });

// const resturantSchema = new mongoose.Schema({
//     menuId : { type : Object },
//     resturantName : { type : String, required: true },
//     resturantPhoneNo : { type : String, required: true },
//     resturantPhoto : { type : Buffer}, 
//     openingTime :{ type: Date, required: true},
//     closingTime : { type: Date, required: true},
//     Rating : { type: Number},
//     addressAddress: { type: addressSchema },
//     created_at: { type: Date, default: Date.now },
//     updated_at: { type: Date, default: Date.now }
// });

// const Resturant = mongoose.model('resturant', resturantSchema);
// console.log('Resturant model created...');
// module.exports = Resturant;
// export default mongoose.model<Resturant>('resturant', resturantSchema);

