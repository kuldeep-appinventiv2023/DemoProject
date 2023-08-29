"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    restaurantId: { type: Number, required: true },
    restaurantName: { type: String, required: true },
    countryCode: { type: Number, required: true },
    City: { type: String, required: true },
    Address: { type: String, required: true },
    Locality: { type: String },
    Longitude: { type: Number },
    Latitude: { type: Number },
    Cuisines: { type: String },
    categoryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' },
    averageCostForTwo: { type: Number },
    Currency: { type: String },
    hasTableBooking: { type: String },
    hasOnlineDelivery: { type: String },
    priceRange: { type: Number },
    aggregateRating: { type: Number },
    Votes: { type: Number },
});
const RestaurantModel = mongoose_1.default.model('restaurant', restaurantSchema);
console.log('Restaurant model created...');
exports.default = RestaurantModel;
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
//# sourceMappingURL=restaurantModel.js.map