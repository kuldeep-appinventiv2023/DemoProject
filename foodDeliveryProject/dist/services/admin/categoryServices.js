"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const constants_1 = require("../../constants");
class CategoryServices {
    async addCategory(newCategoryData) {
        const newCategory = new categoryModel_1.default(newCategoryData);
        await newCategory.save();
        return newCategory;
    }
    async updateCategoryById(categoryId, updateData) {
        try {
            const updatedCategory = await categoryModel_1.default.findByIdAndUpdate(categoryId, updateData, { new: true });
            return updatedCategory;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.errorUpdatingCategory);
        }
    }
    async deleteCategoryById(categoryId) {
        try {
            const deletedCategory = await categoryModel_1.default.findByIdAndRemove(categoryId);
            if (!deletedCategory) {
                throw new Error(constants_1.Constants.errorMsgs.categoryNotFound);
            }
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.errorDeletingCategory);
        }
    }
}
exports.default = new CategoryServices();
//# sourceMappingURL=categoryServices.js.map