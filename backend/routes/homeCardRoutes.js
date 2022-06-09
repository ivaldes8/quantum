const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const {getHomeCards, createHomeCard, updateHomeCard, deleteHomeCard} = require('../controllers/homeCardController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getHomeCards).post(protect,createHomeCard)
router.route('/:id').put(protect, updateHomeCard).delete(protect, deleteHomeCard)

module.exports = router