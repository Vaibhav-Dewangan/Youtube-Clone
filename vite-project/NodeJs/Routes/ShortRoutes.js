import express from 'express';
import { addShort, getAllShorts, getShortsByChannelId, getShortsByCategory, getShortById } from '../Controller/Short_controller.js';
import verifyJWT from '../Middleware/VerifyJWT.js';

const router = express.Router();

// POST route to add a new short
router.post('/add-short', verifyJWT, addShort);

// Route for getting all shorts
router.get('/getAll', getAllShorts);

// Route for getting shorts by channel id
router.get('/get/:channelId', getShortsByChannelId);

// Route for getting shorts by category
router.get('/category/:category', getShortsByCategory);

// Route for geting short by id
router.get('/:shortId', getShortById);

export default router;