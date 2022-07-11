const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const asyncHandler  = require('express-async-handler')

const User = require('../models/userModel')


//@desc Register User
//@route POST /api/users
//@access Public
 
const registerUser = asyncHandler(async (req, res) => {
    //get the fields from the form
    const { name, email, password} = req.body

    //validate the fields
    if(!email || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if the user exists
    const userExists = await User.findOne({email}) //find the user with the email
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create the user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword,
    })

    if(user){
        //return user created status
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


//@desc Authenticate User
//@route POST /api/users/login
//@access Public
 
const loginUser = asyncHandler(async(req, res) => {
    //get user email and password from the form
    const {email, password} = req.body
    //find the user with the email
    const user = await User.findOne({email})
    //check if the password match with the registered password using compare method
    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


//@desc Get User Data
//@route GET /api/users/me
//@access Private
 
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)

    //The user information above replace the code below
    // const { _id, name, email} = await User.findById(req.user.id)

    // res.status(200).json({
    //     id: _id, 
    //     name,
    //     email
    // })
})


//generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    } )
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}
