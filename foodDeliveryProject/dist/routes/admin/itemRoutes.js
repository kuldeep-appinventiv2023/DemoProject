"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminJwtMiddleware_1 = require("../../middleware/adminJwtMiddleware");
const itemController_1 = __importDefault(require("../../controller/admin/itemController"));
const adminItemRouter = express_1.default.Router();
adminItemRouter.post('/addItems', adminJwtMiddleware_1.adminAuthMiddleware, itemController_1.default.addItem);
adminItemRouter.put('/updateItemById/:id', adminJwtMiddleware_1.adminAuthMiddleware, itemController_1.default.updateItem);
adminItemRouter.delete('/deleteItemById/:id', adminJwtMiddleware_1.adminAuthMiddleware, itemController_1.default.deleteItem);
exports.default = adminItemRouter;
//# sourceMappingURL=itemRoutes.js.map