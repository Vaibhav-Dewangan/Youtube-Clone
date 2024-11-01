import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelId: {
        type: String,
        trim: true,
        unique: true, // Ensures uniqueness
        sparse: true,
    },
    channelName: {
        type: String,
        required: true,
        unique: true, // Ensures names are unique
        trim: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    profilePicture: {
        type: String,
        default: '', // URL for profile picture
    },
    bannerImage: {
        type: String,
        default: '', // URL for banner image
    },
    subscriberCount: {
        type: Number,
        default: 0,
        min: 0, //  can't be negative
    },
    videoCount: {
        type: Number,
        default: 0, // Default to zero videos
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the date when the channel is created
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video', // Reference to a Video model
    }],
});

// Middleware to add unique `channelId` if not provided
channelSchema.pre('save', async function (next) {
    if (!this.channelId) {
        // Generate a unique channelId
        let uniqueId;
        let isUnique = false;
        while (!isUnique) {
            uniqueId = Math.floor(Math.random() * 99999999999999).toString();
            const existingChannel = await mongoose.models.Channel.findOne({ channelId: uniqueId });
            if (!existingChannel) {
                isUnique = true;
            }
        }
        this.channelId = uniqueId;
    }
    next();
});

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;