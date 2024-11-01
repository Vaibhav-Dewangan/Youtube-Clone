import express from 'express';
import { addVideo, getAllVideos, dislikeVideo, likeVideo, getVideoById, getVideosByChannelId, getVideosByCategory, getVideosByTitle, addComment, editComment, deleteComment } from '../Controller/Video_controller.js';
import verifyJWT from '../Middleware/VerifyJWT.js';

const router = express.Router();

// POST route to add a new video
router.post('/add-video', verifyJWT, addVideo);

// Route for getting all videos
router.get('/getAll', getAllVideos);

// Route for getting video by id
router.get('/:videoId', getVideoById);

// Route for getting video by channel id
router.get('/get/:channelId', getVideosByChannelId);

// Route for getting video by category
router.get('/category/:category', getVideosByCategory);

// Route for getting video by title
router.get('/title/:title', getVideosByTitle);

// Route for add comment
router.post('/:videoId/comments', addComment)

// Route for edit comment 
router.put('/:videoId/edt/comments/:commentId', editComment)

// Route for delete comment
router.delete('/:videoId/del/comments/:commentId', deleteComment)

// Route for like
router.post('/:videoId/likes', likeVideo)

// Route for dislike
router.post('/:videoId/dislikes', dislikeVideo)

export default router;

