const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const {getHome, createHome, updateHome, deleteHome} = require('../controllers/homeController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(getHome).post(protect,createHome)
router.route('/:id').put(protect, updateHome).delete(protect, deleteHome)

module.exports = router