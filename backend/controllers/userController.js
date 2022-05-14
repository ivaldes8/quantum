const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 

const registerUser = asyncHandler(async(req, res) => {
    const { name, lastName, email, password, role } = req.body

    if(!name || !lastName || !email || !password || !role){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist= await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        lastName,
        email,
        role,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.json({message: 'User created'})
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    res.json({message: 'User loged'})
})

const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}