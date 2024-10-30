import Channel from "../Models/ChannelModels.js";
import User from "../Models/UserModel.js"; // Ensure to import the User model

// Create Channel
export const createChannel = async (req, res) => {
    const { userId, channelName, description, profilePicture, bannerImage, subscriberCount, channelId } = req.body;

    try {
        // Check if the channel already exists
        const isChannel = await Channel.findOne({ channelName });
        if (isChannel) return res.status(409).json({ message: 'Channel already exists!' });

        const newChannel = new Channel({
            channelName,
            description,
            profilePicture,
            bannerImage,
            owner: userId, // Use userId as the owner
            subscriberCount,
            channelId,
        });

        // Save the new channel to the database
        await newChannel.save();

        // Check if the user exists before updating
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found!' });

        // Update the user collection to add the new channel ID and channel name
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { channels: { mongoDB_id: newChannel._id, channelId: newChannel.channelId, name: channelName } } }, // Push an object with channel ID and name
            { new: true } // Return the updated user document
        );

        res.status(201).json({ newChannel, updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Get channel data by channel id
export const getChannelData = async (req, res) => {
    const channelId = req.params.id;
    try {
        const channel = await Channel.findOne({channelId});
        if (!channel) return res.status(404).json({ message: 'channel not found' });

        res.status(200).json({ message: "channel data fetched successfully", channel });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};
