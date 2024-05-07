
const User = require('../models/user-model');

const checkUserAuth = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            error: 'Username and password are required!',
        });
    }

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({
                message: 'User is Unauthorized!',
            });
        }

        return res.status(200).json({
            success: true,
            id: user._id,
            type: user.type,
            message: 'User is authorized!',
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message || 'Internal Server Error',
        });
    }
};


const createUser = async (req, res) => {
    const { username, password, type } = req.body;

    if (!username || !password || !type) {
        return res.status(400).json({
            success: false,
            error: 'Username, password, and type are required!',
        });
    }

    try {
        const newUser = new User({ username, password, type });
        const savedUser = await newUser.save();

        return res.status(201).json({
            success: true,
            data: savedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || 'Error creating user',
        });
    }
};

module.exports = {
    checkUserAuth,
    createUser, 
};
