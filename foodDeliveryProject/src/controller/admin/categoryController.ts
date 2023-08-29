import { Request, Response } from 'express';
import CategoryServices  from '../../services/admin/categoryServices';
import { Constants } from '../../constants';

class CategoryController {
    async add(req: Request, res: Response) {
        const newCategoryData = req.body;
        try {
            const newCategory = await CategoryServices.addCategory(newCategoryData);
            res.status(201).json({ success: true, message: Constants.successMsgs.categoryAdded, category: newCategory });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorAddingCategory });
        }
    }

    async updateById(req: Request, res: Response) {
        const categoryId = req.params.id;
        const updateData = req.body;

        try {
            const updatedCategory = await CategoryServices.updateCategoryById(categoryId, updateData);
            res.status(200).json({ success: true, message: Constants.successMsgs.categoryUpdated, category: updatedCategory });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorUpdatingCategory });
        }
    }

    async deleteById(req: Request, res: Response) {
        const categoryId = req.params.id;

        try {
            await CategoryServices.deleteCategoryById(categoryId);
            res.status(200).json({ success: true, message: Constants.successMsgs.categoryDeleted });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: Constants.errorMsgs.errorDeletingCategory });
        }
    }
}

export default new CategoryController();
