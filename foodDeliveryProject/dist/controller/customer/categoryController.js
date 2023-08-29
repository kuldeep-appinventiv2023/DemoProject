"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryServices_1 = __importDefault(require("../../services/customer/categoryServices"));
const constants_1 = require("../../constants");
class CategoryController {
    async getAll(req, res) {
        try {
            const categories = await categoryServices_1.default.getAllCategories();
            res.send(categories);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(constants_1.Constants.errorMsgs.categoriesNotFound);
        }
    }
    async getById(req, res) {
        const categoryId = req.params.id;
        try {
            const category = await categoryServices_1.default.getCategoryById(categoryId);
            res.status(200).json({ success: true, category });
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .json({ success: false, message: constants_1.Constants.errorMsgs.invalidCatoryId });
        }
    }
    async getByName(req, res) {
        const categoryName = req.body.categoryName;
        try {
            const categories = await categoryServices_1.default.getCategoryByName(categoryName);
            res.status(200).json({ success: true, categories });
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .json({
                success: false,
                message: constants_1.Constants.errorMsgs.invalidCatoryname,
            });
        }
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=categoryController.js.map