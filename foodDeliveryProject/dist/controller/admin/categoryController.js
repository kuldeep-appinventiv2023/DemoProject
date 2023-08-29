"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryServices_1 = __importDefault(require("../../services/admin/categoryServices"));
const constants_1 = require("../../constants");
class CategoryController {
    async add(req, res) {
        const newCategoryData = req.body;
        try {
            const newCategory = await categoryServices_1.default.addCategory(newCategoryData);
            res.status(201).json({ success: true, message: constants_1.Constants.successMsgs.categoryAdded, category: newCategory });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorAddingCategory });
        }
    }
    async updateById(req, res) {
        const categoryId = req.params.id;
        const updateData = req.body;
        try {
            const updatedCategory = await categoryServices_1.default.updateCategoryById(categoryId, updateData);
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.categoryUpdated, category: updatedCategory });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorUpdatingCategory });
        }
    }
    async deleteById(req, res) {
        const categoryId = req.params.id;
        try {
            await categoryServices_1.default.deleteCategoryById(categoryId);
            res.status(200).json({ success: true, message: constants_1.Constants.successMsgs.categoryDeleted });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: constants_1.Constants.errorMsgs.errorDeletingCategory });
        }
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=categoryController.js.map