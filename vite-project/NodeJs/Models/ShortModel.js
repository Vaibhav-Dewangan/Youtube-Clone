// models/Video.js
import mongoose from 'mongoose';

const shortCommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const shortSchema = new mongoose.Schema({
    shortId: { type: String, required: true },
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    description: { type: String, },
    channelId: { type: String, required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    uploadDate: { type: Date, required: true },
    comments: { type: [shortCommentSchema], default: [] },
    category: {type: String, required: true},
    channelName:{type: String ,required: true},
});

const Short = mongoose.model('Short', shortSchema);

export default Short;
