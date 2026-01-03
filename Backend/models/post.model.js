import mongoose from 'mongoose';

const postschema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'user',default: [] }
    ],

    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comment',default: [] }
    ],
    captions: { type: String, default: '' },
    images: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
export const post = mongoose.model("post", postschema);