import mongoose from "mongoose";
import { Document } from "mongoose";

interface Category extends Document {
    categoryName : String, 
    categoryImage : Buffer,
    categoryDescription : String,
    created_at: Date
}

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    profileImage: { type: Buffer},
    categoryDescription: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Category = mongoose.model('category', categorySchema);
console.log('Category model created...');
export default Category;
// export default mongoose.model<Category>('category', categorySchema);
