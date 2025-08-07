const userModel = require('../models/user.model')


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password')
        console.log(users, 'user');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
    }
}

exports.userProfileUpdate = async (req, res) => {
    const { username, email} = req.body
    // const userId = req.user._id
    console.log(req.body);
    
    const userId = '6882447be6bea32e6ddcab5e'
    try {
        if (!username && !email) {
            return res.status(400).json('No data provided')
        }
        const update = {}

        if (username) update.username = username
        if (email) update.email = email

        const user = await userModel.findByIdAndUpdate(userId, update, { new: true })
        if (!user) {
            return res.status(404).json('User not found')
        }
        else {
            res.status(201).json(user)
        }

    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error', error: error.message });

    }
}