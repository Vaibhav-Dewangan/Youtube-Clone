import Video from "../Models/VideoModel.js";

// Add video
export const addVideo = async (req, res) => {
  try {
    const {
      videoId,
      title,
      thumbnailUrl,
      description,
      channelId,
      category,
      uploader,
      uploadDate,
      views = 0,
      likes = 0,
      dislikes = 0,
      comments = [],
      channelName,
    } = req.body;

    const newVideo = new Video({
      videoId,
      title,
      thumbnailUrl,
      description,
      channelId,
      category,
      uploader,
      views,
      likes,
      dislikes,
      uploadDate,
      comments,
      channelName,
    });

    const savedVideo = await newVideo.save();

    res.status(201).json({
      message: 'Video added successfully!',
      video: savedVideo,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error adding video',
      error: error.message,
    });
  }
};


// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await Video.find()

    // Check if videos exist
    if (!videos.length) {
      return res.status(404).json({ message: 'No videos found' });
    }

    return res.status(200).json(videos);
  } catch (error) {

    return res.status(500).json({
      message: 'Error fetching videos',
      error: error.message,
    });
  }
};

// Get video by id
export const getVideoById = async (req, res) => {
  const videoId = req.params.videoId;
  try {
    // Fetch video from the database
    const video = await Video.findOne({ videoId });

    // Check if video exist
    if (!video) {
      return res.status(404).json({ message: 'No videos found' });
    }

    return res.status(200).json(video);
  } catch (error) {

    return res.status(500).json({
      message: 'Error fetching video',
      error: error.message,
    });
  }
};

//Get videos by channel id
export const getVideosByChannelId = async (req, res) => {
  const channelId = req.params.channelId;
  try {
    // Fetch all videos from the database
    const video = await Video.find({ channelId });

    // Check if videos exist
    if (!video) {
      return res.status(404).json({ message: 'No videos found' });
    }

    return res.status(200).json(video);
  } catch (error) {

    return res.status(500).json({
      message: 'Error fetching videos ',
      error: error.message,
    });
  }
};

// Get videos by category
export const getVideosByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    // Fetch all videos from the database
    const videos = await Video.find({ category });

    // Check if videos exist
    if (videos.length === 0) {
      return res.status(404).json({ message: 'No videos found' });
    }

    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching videos',
      error: error.message,
    });
  }
};

// Get videos by title with case-insensitive and partial matching
export const getVideosByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    // Fetch videos matching the title partially and case-insensitively
    const videos = await Video.find({ title: { $regex: title, $options: "i" } });

    // Check if any videos were found
    if (videos.length === 0) {
      return res.status(404).json({ message: 'No videos found' });
    }

    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching videos',
      error: error.message,
    });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  const { text, userId, username } = req.body;
  const { videoId } = req.params;

  try {
    const video = await Video.findOne({ videoId });
    const newComment = { userId: userId, text: text, username: username };
    video.comments.push(newComment);
    await video.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment.' });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params;

  try {
    // Find the video by videoId and pull the comment by its _id
    const video = await Video.findOneAndUpdate(
      { videoId },
      { $pull: { comments: { _id: commentId } } },
      { new: true } // Return the update
    );

    // Check if the video or comment was not found
    if (!video) {
      return res.status(404).json({ message: "Video not found or comment already deleted." });
    }

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment." });
  }
};


// Edit a comment
export const editComment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const { text } = req.body;

  try {
    // Find the video and update the comment text by its _id
    const video = await Video.findOneAndUpdate(
      { videoId, "comments._id": commentId },
      { $set: { "comments.$.text": text } },
      { new: true } // Return the update
    );

    // Check if the video or comment was not found
    if (!video) {
      return res.status(404).json({ message: "Video not found or comment not found." });
    }

    res.status(200).json({ message: "Comment edited successfully.", video });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ message: "Failed to edit comment." });
  }
};

// Like a video
export const likeVideo = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.body.userId;

  try {
    const video = await Video.findOne({ videoId });
    if (!video) return res.status(404).json({ message: "Video not found." });

    // Check if the user has already liked the video
    if (video.likedBy.includes(userId)) {
      return res.status(400).json({ message: "You have already liked this video." });
    }

    // Check if the user has disliked the video, if so, remove the dislike
    if (video.dislikedBy.includes(userId)) {
      video.dislikes -= 1;
      video.dislikedBy = video.dislikedBy.filter(id => id.toString() !== userId);
    }

    video.likes += 1; // Increment likes
    video.likedBy.push(userId); // Add user to likedBy
    await video.save();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Dislike a video
export const dislikeVideo = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.body.userId; // Get userId from request body

  try {
    const video = await Video.findOne({ videoId });
    if (!video) return res.status(404).json({ message: "Video not found." });

    // Check if the user has already disliked the video
    if (video.dislikedBy.includes(userId)) {
      return res.status(400).json({ message: "You have already disliked this video." });
    }

    // Check if the user has liked the video, if so, remove the like
    if (video.likedBy.includes(userId)) {
      video.likes -= 1;
      video.likedBy = video.likedBy.filter(id => id.toString() !== userId);
    }

    video.dislikes += 1; // Increment dislikes
    video.dislikedBy.push(userId); // Add user to dislikedBy
    await video.save();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


