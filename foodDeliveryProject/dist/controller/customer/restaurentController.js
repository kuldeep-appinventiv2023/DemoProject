"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantServices_1 = __importDefault(require("../../services/customer/restaurantServices"));
const restaurantModel_1 = __importDefault(require("../../models/restaurantModel"));
const constants_1 = require("../../constants");
class RestaurantController {
    async getAllResturant(req, res) {
        let page = req.query.page || "1";
        const ipage = +page;
        const perPage = 10;
        try {
            const totalCount = await restaurantModel_1.default.countDocuments();
            const totalPages = Math.ceil(totalCount / perPage);
            const restaurants = await restaurantServices_1.default.getAllRestaurants(ipage, perPage);
            res.status(200).json({ success: true, restaurants, totalPages });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: constants_1.Constants.errorMsgs.fetchRestaurantsError,
            });
        }
    }
    async getRestaurantById(req, res) {
        const restaurantID = req.query.restaurantId;
        try {
            const restaurant = await restaurantServices_1.default.getRestaurantById(restaurantID);
            res.status(200).json({ success: true, restaurant });
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .json({
                success: false,
                message: constants_1.Constants.errorMsgs.invalidRestaurantId,
            });
        }
    }
    async getRestaurantByName(req, res) {
        const restaurantName = req.query.restaurantName;
        try {
            const restaurants = await restaurantServices_1.default.getRestaurantByName(restaurantName);
            res.status(200).json({ success: true, restaurants });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: constants_1.Constants.errorMsgs.fetchRestaurantsError,
            });
        }
    }
    async getRestaurantByCityName(req, res) {
        const City = req.query.City;
        try {
            const restaurants = await restaurantServices_1.default.getRestaurantByCityName(City);
            res.status(200).json({ success: true, restaurants });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: constants_1.Constants.errorMsgs.fetchRestaurantsError,
            });
        }
    }
    async getRestaurantsByCategory(req, res) {
        const categoryName = req.query.categoryName;
        try {
            const restaurants = await restaurantServices_1.default.getRestaurantsByCategoryName(categoryName);
            res.status(200).json({ success: true, restaurants });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.fetchRestaurantsError });
        }
    }
    async findRestaurantbyFilter(req, res) {
        const Latitude = parseFloat(req.query.Latitude);
        const Longitude = parseFloat(req.query.Longitude);
        const { restaurantID, restaurantName, City, startPrice, endPrice, price, category, startRating, endRating, aggregateRating, } = req.query;
        try {
            let aggregatePipeline = [];
            if (restaurantID) {
                aggregatePipeline.push({ $match: { restaurantID } });
            }
            else if (City) {
                aggregatePipeline.push({ $match: { City } });
            }
            else if (restaurantName) {
                aggregatePipeline.push({ $match: { restaurantName } });
            }
            else if (startPrice && endPrice) {
                const start = parseFloat(startPrice);
                const end = parseFloat(endPrice);
                aggregatePipeline.push({
                    $match: {
                        price: { $gte: start, $lte: end },
                    },
                });
            }
            else if (category) {
                aggregatePipeline.push({ $match: { category } });
            }
            else if (startRating && endRating) {
                const start = parseFloat(startRating);
                const end = parseFloat(endRating);
                aggregatePipeline.push({
                    $match: {
                        aggregateRating: { $gte: start, $lte: end },
                    },
                });
            }
            else if (price && category) {
                aggregatePipeline.push({
                    $match: { price: { $lte: parseFloat(price) }, category },
                });
            }
            else if (price && aggregateRating) {
                aggregatePipeline.push({
                    $match: {
                        price: { $lte: parseFloat(price) },
                        aggregateRating: { $lte: parseFloat(aggregateRating) },
                    },
                });
            }
            else if (Latitude && Longitude) {
                const coordinates = [Longitude, Latitude];
                aggregatePipeline.push({
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates,
                        },
                        minDistance: 10,
                        maxDistance: 50000,
                        distanceField: "distance",
                        spherical: true,
                    },
                });
            }
            else {
                return res.send(constants_1.Constants.errorMsgs.pleaseProvideData);
            }
            const restaurants = await restaurantModel_1.default.aggregate(aggregatePipeline);
            console.log(restaurants);
            res.send(restaurants);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: constants_1.Constants.errorMsgs.fetchRestaurantsError,
            });
        }
    }
}
exports.default = new RestaurantController();
//# sourceMappingURL=restaurentController.js.map