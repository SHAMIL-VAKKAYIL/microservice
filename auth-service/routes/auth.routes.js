const express = require('express')
const { userSignup, userSignin, userLogout, userCheckAuth } = require('../controllers/auth.controller')
const { userProtectRoute } = require('../../common-middleware/auth.middleware')

const router = express.Router()


router.post('/signup', userSignup)
router.post('/signin', userSignin)
router.get('/authCheck',userProtectRoute,userCheckAuth)
router.post('/logout', userProtectRoute, userLogout)


module.exports = router