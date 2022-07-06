const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Action = require('../models/actionModel')
const Investment = require('../models/investmentModel')
const Group = require('../models/groupModel')
const Exchange = require('../models/exchangeModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, lastName, email, password, role, currency } = req.body

    if (!name || !email || !password || !role || !lastName || !currency) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    if (role === 'Admin') {
        res.status(400)
        throw new Error('Users can create accounts with role User only')
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const storeduser = await User.create({
        name,
        lastName,
        email,
        role,
        currency,
        password: hashedPassword
    })

    const user = await User.findById(storeduser._id).populate("currency");

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            currency: user.currency,
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

    const user = await User.findOne({ email }).populate("currency")
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            currency: user.currency,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    res.json({ message: 'User loged' })
})

const getMe = asyncHandler(async (req, res) => {
    const email = req.user.email
    const user = await User.findOne({ email }).populate("currency")
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    res.status(200).json(user)
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

    if (req.body.currency) {
        const exchange = await Exchange.find({ user: req.user._id, currency: req.body.currency })
        if (exchange.length > 0 && req.body.currency === exchange[0].currency.toString()) {
            const updatedExchange = await Exchange.findByIdAndUpdate(exchange[0]._id, { currency: req.user.currency })
        }

        if (exchange.length === 0) {
            res.status(400)
            throw new Error('You must to specify an exchange for your new default currency first')
        }
    }

    if (req.body.password) {
        const { password } = req.body
        const salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(password, salt)
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body.password ? { ...req.body, password: hashedPassword } : req.body, {
        new: true,
    }).populate("currency");

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

    const user = await User.find({}).populate("currency")

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

    const { name, lastName, email, password, role, currency } = req.body

    if (!name || !lastName || !email || !password || !role || !currency) {
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

    const storedUser = await User.create({
        name,
        lastName,
        currency,
        email,
        role,
        currency,
        password: hashedPassword
    })

    const user = await User.findById(storedUser._id).populate("currency");

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
    }).populate("currency");

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
    await Exchange.deleteMany({ user: req.params.id })

    await user.remove();
    res.status(200).json({ id: req.params.id });
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '12h'
    })
}

//----------------------------------------------------------------------------------------
const resumeInvestment = async (investment, userCurrency, userId) => {
    let deposit = 0
    let feedback = 0

    if (investment.length === 0) {
        return [deposit, feedback]
    }
    const exchange = await Exchange.find({ user: userId, currency: investment.currency })

    if (investment.length) {
        for (let i = 0; i < investment.length; i++) {
            if (investment[i].currency._id.toString() === userCurrency.toString()) {
                deposit += investment[i].actions.map((a) => { return a.amount }).reduce((a, b) => a + b, 0)
                feedback += investment[i].actions.map((a) => { return a.feedback }).reduce((a, b) => a + b, 0)
            } else {
                const exchange = await Exchange.find({ user: userId, currency: investment[i].currency._id })
                deposit += investment[i].actions.map((a) => { return a.amount / exchange[0].change }).reduce((a, b) => a + b, 0)
                feedback += investment[i].actions.map((a) => { return a.feedback / exchange[0].change }).reduce((a, b) => a + b, 0)
            }
        }
    } else {
        if (investment.currency._id.toString() === userCurrency.toString()) {
            deposit += investment.actions.map((a) => { return a.amount }).reduce((a, b) => a + b, 0)
            feedback += investment.actions.map((a) => { return a.feedback }).reduce((a, b) => a + b, 0)
        } else {
            deposit += investment.actions.map((a) => { return a.amount / exchange[0].change }).reduce((a, b) => a + b, 0)
            feedback += investment.actions.map((a) => { return a.feedback / exchange[0].change }).reduce((a, b) => a + b, 0)
        }
    }


    return [deposit, feedback]
}

const getDashboard = asyncHandler(async (req, res) => {

    const investment = await Investment.find({ user: req.user.id }).populate("actions").populate("currency")
    const exchange = await Exchange.find({ user: req.user.id })
    const group = await Group.find({ user: req.user.id }).populate({
        path: 'investments',
        populate: [
            { path: 'actions' },
            { path: 'currency' }
        ]
    });

    let auxDepositFeedBack = await resumeInvestment(investment, req.user.currency, req.user.id)

    const dashboard = {
        deposit: auxDepositFeedBack[0],
        feedback: auxDepositFeedBack[1],
        ganancy: -auxDepositFeedBack[0] + auxDepositFeedBack[1],
        groups: group,
        exchanges: exchange,
        userCurrency: req.user.currency,
        investments: investment
    }

    res.status(200).json({ dashboard });

})



module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateCurrentUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getDashboard
}