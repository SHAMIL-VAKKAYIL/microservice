
exports.userSignup = async (req, res) => {
    const { username, email, password } = req.body
    try {

        const exuser = await User.findOne({ email: email })
        if (exuser) {
            return res.status(400).json('Email already exists')
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedpassword = await bcrypt.hash(password, salt)

            const newUser = new User({ username, email, password: hashedpassword })
            await newUser.save()

            return res.status(201).json({ message: 'User created successfully' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error creating user' })
    }
}

exports.userSignin = async (req, res) => {
    const { email, password } = req.body
    console.log(email,password);
    
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json('invalid credentials')
        }
        else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            console.log(isPasswordCorrect);
            if (!isPasswordCorrect) {
                return res.status(400).json('invalid credentials')
            }
            else {
                console.log(user);
                
                userToken(user._id, res)
                res.status(200).json({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                })
            }
        }
    } catch (error) {
        console.log(error);
        
        res.status(404).json({ message: "internalError" })
    }
}