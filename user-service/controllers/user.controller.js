const userModel = require('../models/user.model')


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password')
        res.status(200).json(users)
    } catch (error) {
                return res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
}

exports.userProfileUpdate = async (req, res) => {
    const { username, email} = req.body
    const userId = req.user._id
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