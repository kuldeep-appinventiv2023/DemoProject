"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const itemController_1 = __importDefault(require("../../controller/customer/itemController"));
const customerItemRouter = express_1.default.Router();
customerItemRouter.get('/getAllItems', jwtMiddleware_1.authMiddleware, itemController_1.default.getAllItems);
customerItemRouter.get('/getItemBy/:id', jwtMiddleware_1.authMiddleware, itemController_1.default.getItemById);
exports.default = customerItemRouter;
//# sourceMappingURL=itemRoutes.js.map