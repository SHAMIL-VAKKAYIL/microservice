const jwt = require('jsonwebtoken')

exports.userToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SCERATE, { expiresIn: '7d' })

    res.cookie('user', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
    })
    return token

}

