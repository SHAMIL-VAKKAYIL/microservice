const express = require('express')
const { userProfileUpdate, getAllUsers } = require('../controllers/user.controller')
const { userProtectRoute, adminProtectRoute } = require('../../common-middleware/auth.middleware')

const router = express.Router()

router.put('/updateProfile',userProtectRoute, userProfileUpdate)
router.get('/allUsers', adminProtectRoute, getAllUsers)

module.exports=router