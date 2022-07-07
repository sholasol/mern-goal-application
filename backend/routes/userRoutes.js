const express = require('express')

const router = express.Router()


//bring in user controller
const { registerUser, loginUser, getMe} = require('../controllers/userController')

const { protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe) //use the protect to prevent unauthorised access to user details
 


module.exports = router