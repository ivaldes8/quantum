const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Action = require('../models/actionModel')
const Investment = require('../models/investmentModel')
const Group = require('../models/groupModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, lastName, email, password, role } = req.body

    if (!name || !lastName || !email || !password || !role) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
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

    if (user) {
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
    res.json({ message: 'User created' })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
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
    res.json({ message: 'User loged' })
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const updateCurrentUser = asyncHandler(async (req, res) => {

    let hashedPassword = null;

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    if (req.body.role) {
        res.status(400)
        throw new Error('Users can not change the roles')
    }

    if (req.body.password) {
        const { password } = req.body
        const salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(password, salt)
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body.password ? { ...req.body, password: hashedPassword } : req.body, {
        new: true,
    });

    res.status(200).json(updatedUser);
})


//-----------------------------------------------------------------------------------

const getUsers = asyncHandler(async (req, res) => {

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (req.user.role !== 'Admin') {
        res.status(401)
        throw new Error('User not authorized')
    }

    const user = await User.find({})

    res.status(200).json({ user });

})

const createUser = asyncHandler(async (req, res) => {

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (req.user.role !== 'Admin') {
        res.status(401)
        throw new Error('User not authorized')
    }

    const { name, lastName, email, password, role } = req.body

    if (!name || !lastName || !email || !password || !role) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
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

    if (user) {
        res.status(201).json({ user })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.json({ message: 'User created' })
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error("user not found");
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (req.user.role !== 'Admin') {
        res.status(401)
        throw new Error('User not authorized')
    }

    if (req.body.password) {
        res.status(400)
        throw new Error('The passwords cannot be changed by the admin')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error("home not found");
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (req.user.role !== 'Admin') {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Action.deleteMany({ user: req.params.id })
    await Investment.deleteMany({ user: req.params.id })
    await Group.deleteMany({ user: req.params.id })

    await user.remove();
    res.status(200).json({ id: req.params.id });
});


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '12h'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateCurrentUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}