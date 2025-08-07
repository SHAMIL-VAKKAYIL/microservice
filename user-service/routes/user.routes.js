const express = require('express')
const { userProtectRoute, adminProtectRoute } = require('../../common-middleware/auth.middleware')
const { userProfileUpdate, getAllUsers } = require('../controllers/user.controller')

const router = express.Router()

router.put('/updateProfile', userProfileUpdate)
router.get('/allUsers', adminProtectRoute, getAllUsers)

module.exports=router