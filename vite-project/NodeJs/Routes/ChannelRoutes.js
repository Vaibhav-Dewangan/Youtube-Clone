import express from 'express';
import { createChannel, getChannelData } from '../Controller/Channel.js';

const router = express.Router();

 // Create channel
 router.post('/create',createChannel);

 // Get channel Data
 router.get('/data/:id',getChannelData);

 export default router;

