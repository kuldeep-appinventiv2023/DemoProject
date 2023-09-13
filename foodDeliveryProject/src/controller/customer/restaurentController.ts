import { Request, Response } from "express";
import RestaurantService from "../../services/customer/restaurantServices";
import Restaurant from "../../models/restaurantModel";
import { Constants } from "../../constants";

class RestaurantController {
  async getAllResturant(req: Request, res: Response) {
    let page: any = req.query.page || "1";
    const ipage = +page;
    const perPage = 10;
    try {
      const totalCount = await Restaurant.countDocuments();
      const totalPages = Math.ceil(totalCount / perPage);
      const restaurants = await RestaurantService.getAllRestaurants(
        ipage,
        perPage
      );
      res.status(200).json({ success: true, restaurants, totalPages });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: Constants.errorMsgs.fetchRestaurantsError,
      });
    }
  }
  async getRestaurantById(req: Request, res: Response) {
    const restaurantID = req.query.restaurantId;

    try {
      const restaurant = await RestaurantService.getRestaurantById(
        restaurantID
      );
      res.status(200).json({ success: true, restaurant });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          success: false,
          message: Constants.errorMsgs.invalidRestaurantId,
        });
    }
  }

  async getRestaurantByName(req: Request, res: Response) {
    const restaurantName: any = req.query.restaurantName;

    try {
      const restaurants = await RestaurantService.getRestaurantByName(
        restaurantName
      );
      res.status(200).json({ success: true, restaurants });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: Constants.errorMsgs.fetchRestaurantsError,
      });
    }
  }

  async getRestaurantByCityName(req: Request, res: Response) {
    const City: any = req.query.City;

    try {
      const restaurants = await RestaurantService.getRestaurantByCityName(City);
      res.status(200).json({ success: true, restaurants });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: Constants.errorMsgs.fetchRestaurantsError,
      });
    }
  }

  async getRestaurantsByCategory(req: Request, res: Response) {
    const categoryName = req.query.categoryName; 
    try {
        const restaurants = await RestaurantService.getRestaurantsByCategoryName(categoryName);
        res.status(200).json({ success: true, restaurants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: Constants.errorMsgs.fetchRestaurantsError });
    }
  }

  async findRestaurantbyFilter(req: Request, res: Response) {
    const Latitude = parseFloat(req.query.Latitude as string);
    const Longitude = parseFloat(req.query.Longitude as string);

    const {
      restaurantID,
      restaurantName,
      City,
      startPrice,
      endPrice,
      price,
      category,
      startRating,
      endRating,
      aggregateRating,
    } = req.query;

    try {

      let aggregatePipeline: any = [];

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
        const start = parseFloat(startPrice as string);
        const end = parseFloat(endPrice as string);
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
        const start = parseFloat(startRating as string);
        const end = parseFloat(endRating as string);
        aggregatePipeline.push({
          $match: {
            aggregateRating: { $gte: start, $lte: end },
          },
        });
      }
      else if (price && category) {
        aggregatePipeline.push({
          $match: { price: { $lte: parseFloat(price as string) }, category },
        });
      } 
      else if (price && aggregateRating) {
        aggregatePipeline.push({
          $match: {
            price: { $lte: parseFloat(price as string) },
            aggregateRating: { $lte: parseFloat(aggregateRating as string) },
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
        return res.send(Constants.errorMsgs.pleaseProvideData);
      }

      const restaurants = await Restaurant.aggregate(aggregatePipeline);
      console.log(restaurants);
      res.send(restaurants);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: Constants.errorMsgs.fetchRestaurantsError,
      });
    }
  }
}
export default new RestaurantController();
