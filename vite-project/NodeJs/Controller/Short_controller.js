import Short from "../Models/ShortModel.js";

// Add short
export const addShort = async (req, res) => {
  try {
    const {
      shortId,
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

    const newShort = new Short({
      shortId,
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

    const savedShort = await newShort.save();

    res.status(201).json({
      message: 'Short added successfully!',
      short: savedShort,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error adding short',
      error: error.message,
    });
  }
};


// Get all shorts
export const getAllShorts = async (req, res) => {
  try {
    // Fetch all shorts from the database
    const shorts = await Short.find()

    // Check if shorts exist
    if (!shorts.length) {
      return res.status(404).json({ message: 'No shorts found' });
    }

    return res.status(200).json(shorts);
  } catch (error) {

    return res.status(500).json({
      message: 'Error fetching shorts',
      error: error.message,
    });
  }
};

// Get short by id
export const getShortById = async (req, res) => {
  const shortId = req.params.shortId;
  try {
    // Fetch short from the database
    const short = await Short.findOne({ shortId });

    // Check if short exist
    if (!short) {
      return res.status(404).json({ message: 'No short found' });
    }

    return res.status(200).json(short);
  } catch (error) {

    return res.status(500).json({
      message: 'Error fetching short',
      error: error.message,
    });
  }
};

//Get shorts by channel id
export const getShortsByChannelId = async (req, res) => {
  const channelId = req.params.channelId;
  try {
    // Fetch all shorts from the database
    const short = await Short.find({ channelId });

    // Check if shorts exist
    if (!short) {
      return res.status(404).json({ message: 'No Short found' });
    }

    return res.status(200).json(short);
  } catch (error) {

    return res.status(500).json({
      message: 'Error fetching short',
      error: error.message,
    });
  }
}

// Get Shorts by category
export const getShortsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    // Fetch all Shorts from the database
    const Shorts = await Short.find({ category });

    // Check if Shorts exist
    if (Shorts.length === 0) {
      return res.status(404).json({ message: 'No Shorts found' });
    }

    return res.status(200).json(Shorts);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching Shorts',
      error: error.message,
    });
  }
};