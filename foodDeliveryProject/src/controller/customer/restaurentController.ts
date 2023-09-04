import { Request, Response } from "express";
import RestaurantService from "../../services/customer/restaurantServices";
import Restaurant from "../../models/restaurantModel";
import { Constants } from "../../constants";

class RestaurantController {
  async getAllResturant(req: Request, res: Response) {
    let page:number = +(req.query.page || "1");
    const perPage:number = +(req.query.limit || "10");
    try {
      const totalCount = await Restaurant.countDocuments();
      const totalPages = Math.ceil(totalCount / perPage);

      const restaurants = await RestaurantService.getAllRestaurants( page, perPage );
      res.status(200).json({ success: true, restaurants, totalPages });

    } 
    catch (error) {
      console.log(error);
      res.status(500).json({success: false, message: Constants.errorMsgs.fetchRestaurantsError});
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
      res.status(500).json({
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
      const restaurants = await RestaurantService.getRestaurantsByCategoryName(
        categoryName
      );
      res.status(200).json({ success: true, restaurants });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          success: false,
          message: Constants.errorMsgs.fetchRestaurantsError,
        });
    }
  }

  async findRestaurantbyFilter(req: Request, res: Response) {
    const latitude = parseFloat(req.query.Latitude as string);
    const longitude = parseFloat(req.query.Longitude as string);

    const {
      restaurantName,
      city,
      category,
      startRating,
      endRating,
      aggregateRating,
    } = req.query;

    const restaurantId = +(req.query.restaurantId);

    try {
      let aggregatePipeline: any = [];

      if (restaurantId) {
        aggregatePipeline.push({ $match: { restaurantId } });
      } 
      if (city) {
        aggregatePipeline.push({ $match: { city } });
      } 
      if (restaurantName) {
        aggregatePipeline.push({ $match: { restaurantName } });
      } 
      if (category) {
        aggregatePipeline.push({ $match: { category } });
      } 
      if (startRating && endRating) {
        const start = parseFloat(startRating as string);
        const end = parseFloat(endRating as string);
        aggregatePipeline.push({
          $match: {
            aggregateRating: { $gte: start, $lte: end },
          },
        });
      }  
      if (aggregateRating) {
        aggregatePipeline.push({
          $match: {
            aggregateRating: { $lte: parseFloat(aggregateRating as string) },
          },
        });
      }      
      if (latitude && longitude) {
        const coordinates = [longitude, latitude];
        aggregatePipeline.push({
          $geoNear: {
            near: {
              type: "Point",
              coordinates,
            },
            distanceField: "distance",
            spherical: true,
            maxDistance: 50000,
          },
        });
      } 
      if(null){
        return res.send(Constants.errorMsgs.pleaseProvideData);
      }

      const restaurants = await Restaurant.aggregate(aggregatePipeline);
      console.log(restaurants);
      res.send(restaurants);

    } 
    catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: Constants.errorMsgs.fetchRestaurantsError,
      });
    }
  }
}
export default new RestaurantController();
