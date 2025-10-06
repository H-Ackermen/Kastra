import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        contents : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }]
    }
);
export const Category = mongoose.model('Tag', categorySchema);
