import express from 'express';
import { register, login, getUserById } from '../Controller/LoginRegister.js';
import { updateAvatar } from '../Controller/UpdateController.js';
import verifyJWT from '../Middleware/VerifyJWT.js';

const router = express.Router();

// Register routes
router.post('/register', register);

// Login routes
router.post('/login', login);

// Fetch user data by id
router.get('/:email', getUserById);

// Route for updating avatar
router.put('/update/avatar', verifyJWT, updateAvatar);

export default router;