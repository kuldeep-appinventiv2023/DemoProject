import { Request, Response } from "express";
import CategoryService from "../../services/customer/categoryServices";
import { Constants } from "../../constants";

class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.send(categories);
    } catch (error) {
      console.log(error);
      res.status(500).send(Constants.errorMsgs.categoriesNotFound);
    }
  }

  async getById(req: Request, res: Response) {
    const categoryId = req.params.id;

    try {
      const category = await CategoryService.getCategoryById(categoryId);
      res.status(200).json({ success: true, category });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: Constants.errorMsgs.invalidCatoryId });
    }
  }

  async getByName(req: Request, res: Response) {
    const categoryName = req.body.categoryName;

    try {
      const categories = await CategoryService.getCategoryByName(categoryName);
      res.status(200).json({ success: true, categories });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          success: false,
          message: Constants.errorMsgs.invalidCatoryname,
        });
    }
  }

  
}

export default new CategoryController();
