import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
    {
        tagname: { type: String, required: true, unique: true },
        description: { type: String, required: false },
        contents : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }]
    }
);
export const Tag = mongoose.model('Tag', tagSchema);
