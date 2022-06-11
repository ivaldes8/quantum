const express = require('express')
const {registerUser, loginUser, getMe, getUsers, updateCurrentUser, updateUser, deleteUser, createUser} = require('../controllers/userController')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.route('/me').get(protect, getMe).put(protect, updateCurrentUser)
router.get('/all', protect, getUsers)
router.route('/:id').put(protect, updateUser).delete(protect, deleteUser)
router.post('/new', protect, createUser)

module.exports = router