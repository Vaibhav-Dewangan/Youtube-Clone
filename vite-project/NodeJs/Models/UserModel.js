import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s" },
    channels: [{
        mongoDB_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
        channelId: { type: String, unique: true, trim: true },
        name: { type: String }
    }]
});

const User = mongoose.model('User', userSchema);

export default User;



