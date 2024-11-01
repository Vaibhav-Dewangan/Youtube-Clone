import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';

// User Registration
export const register = async (req, res) => {
    const { username, email, password, avatar } = req.body;
    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({ avatar, username, email, password: hashedPass });
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resistering user', error: error.message })
    }
};

// User Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); //Find user by email
        if (!user) return res.status(404).json({ message: 'User not found' });

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, "JWT_SECRET", { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successfull' });
    } catch (error) {
        res.status(500).json({ message: 'Login Failed! ' });
    }


};

// GET /user/: Fetch details of a single user by its ID.
export const getUserById = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
