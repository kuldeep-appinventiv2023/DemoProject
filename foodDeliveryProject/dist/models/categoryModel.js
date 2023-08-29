"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    categoryName: { type: String, required: true },
    profileImage: { type: Buffer },
    categoryDescription: { type: String },
    created_at: { type: Date, default: Date.now }
});
const Category = mongoose_1.default.model('category', categorySchema);
console.log('Category model created...');
exports.default = Category;
// export default mongoose.model<Category>('category', categorySchema);
//# sourceMappingURL=categoryModel.js.map