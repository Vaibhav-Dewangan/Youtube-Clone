import express from 'express';
import { createChannel, getChannelData } from '../Controller/Channel.js';
import verifyJWT from '../Middleware/VerifyJWT.js';

const router = express.Router();

// Create channel
router.post('/create', verifyJWT, createChannel);

// Get channel Data
router.get('/data/:id', getChannelData);

export default router;

