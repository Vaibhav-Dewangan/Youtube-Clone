import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    userAvatar: { type: String, required:true},
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    description: { type: String, required: true },
    channelId: { type: String, required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    uploadDate: { type: Date, required: true },
    comments: { type: [commentSchema], default: [] },
    category: { type: String, required: true },
    channelName: { type: String, required: true },
    likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // Track users who liked the video
    dislikedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] } // Track users who disliked the video
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
