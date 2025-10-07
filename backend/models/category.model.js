import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        contents : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }]
    }
);
const Category = mongoose.model('Category', categorySchema);
export default Category;
