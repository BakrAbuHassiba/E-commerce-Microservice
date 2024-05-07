const User = require('../models/user-model')

checkUserAuth = async (req, res) => {
    const {username, password} = req.body;
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'username and password are required!',
        })
    }

    User.findOne({ username: username, password: password }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                err,
                message: 'User is Unauthorized!',
            })
        } else {
            return res.status(200).json({
                success: true,
                id: user._id,
                message: 'User is authorized!',
            })
        }
    })
}

checkServiceRunning = (req, res) => {
    res.send('Hello World! - from users service');
}

module.exports = {
    checkUserAuth,
    checkServiceRunning
}