"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const constants_1 = require("../../constants");
class CategoryService {
    async getAllCategories() {
        try {
            const allCategories = await categoryModel_1.default.find();
            if (!allCategories) {
                throw new Error(constants_1.Constants.errorMsgs.categoryNotFound);
            }
            return allCategories;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.categoriesNotFound);
        }
    }
    async getCategoryById(categoryId) {
        try {
            const category = await categoryModel_1.default.findById(categoryId);
            if (!category) {
                throw new Error(constants_1.Constants.errorMsgs.categoryNotFound);
            }
            return category;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.invalidCatoryId);
        }
    }
    async getCategoryByName(categoryName) {
        try {
            const categories = await categoryModel_1.default.find({ categoryName: { $regex: categoryName, $options: 'i' } });
            return categories;
        }
        catch (error) {
            throw new Error(constants_1.Constants.errorMsgs.invalidCatoryname);
        }
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=categoryServices.js.map