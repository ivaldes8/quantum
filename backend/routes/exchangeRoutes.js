const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const {getExchanges, createExchange, updateExchange, deleteExchange} = require('../controllers/exchangeController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getExchanges).post(protect,createExchange)
router.route('/:id').put(protect,updateExchange).delete(protect,deleteExchange)

module.exports = router