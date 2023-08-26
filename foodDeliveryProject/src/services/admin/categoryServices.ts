import Category from "../../models/categoryModel";
import { Constants } from '../../constants';

class CategoryServices {
    async addCategory(newCategoryData: any) {
        const newCategory = new Category(newCategoryData);
        await newCategory.save();
        return newCategory;
    }

    async updateCategoryById(categoryId: any, updateData: any) {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
            return updatedCategory;
        } catch (error) {
            throw new Error(Constants.errorMsgs.errorUpdatingCategory);
        }
    }

    async deleteCategoryById(categoryId: string) {
        try {
            const deletedCategory = await Category.findByIdAndRemove(categoryId);
            if (!deletedCategory) {
                throw new Error(Constants.errorMsgs.categoryNotFound);
            }
        } catch (error) {
            throw new Error(Constants.errorMsgs.errorDeletingCategory);
        }
    }
}

export default new CategoryServices();
