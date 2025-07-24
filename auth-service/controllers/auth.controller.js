const client = require("../services/userGrpcClient")
const bcrypt = require('bcryptjs')
const { userToken } = require("../utils/Token")




exports.userSignup = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        client.addUser({ username, email, password: hashedpassword }, (err, data) => {

            if (err) return res.status(401).json({ message: 'Email already exists' })
                
            res.status(200).json({ message: 'User created successfully' })
        })

    } catch (error) {
        res.status(500).json({ message: 'Error creating user' })
    }
}


exports.userSignin = async (req, res) => {
    const { email, password } = req.body

    try {

        client.getUserByEmail({ email }, async (err, data) => {

            if (err || !data) return res.status(401).json({ message: 'User not found' });
            const isMatch = await bcrypt.compare(password, data.password)
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
            userToken(data.id, res)
            res.status(200).json({
                id: data._id,
                username: data.username,
                email: data.email,
            })

        })
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "internalError" })
    }
}


exports.userCheckAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log('error in checkAuth', error);
        res.status(500).json({ message: 'internal server error' })

    }
}

exports.userLogout = async (req, res) => {
    try {
        res.cookie("user", "", { maxAge: 0 })
        res.json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(404).json({ message: 'internal error' })
    }
}