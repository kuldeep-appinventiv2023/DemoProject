import Category from '../../models/categoryModel';
import { Constants } from "../../constants";

class CategoryService {
    async getAllCategories() {
        try {
            const allCategories = await Category.find();
            if (!allCategories) {
                throw new Error(Constants.errorMsgs.categoryNotFound);
            }
            return allCategories;
        } catch (error) {
            throw new Error(Constants.errorMsgs.categoriesNotFound);
        }
    }

    async getCategoryById(categoryId: string) {
        try {
            const category = await Category.findById(categoryId);
            if (!category) {
                throw new Error(Constants.errorMsgs.categoryNotFound);
            }
            return category;
        } catch (error) {
            throw new Error(Constants.errorMsgs.invalidCatoryId);
        }
    }

    async getCategoryByName(categoryName: string) {
        try {
            const categories = await Category.find({ categoryName: { $regex: categoryName, $options: 'i' } });
            return categories;
        } catch (error) {
            throw new Error(Constants.errorMsgs.invalidCatoryname);
        }
    }
}

export default new CategoryService();
