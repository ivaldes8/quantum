const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const {getCurrencies, createCurrency, updateCurrency, deleteCurrency} = require('../controllers/currencyController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getCurrencies).post(protect,createCurrency)
router.route('/:id').put(protect,updateCurrency).delete(protect,deleteCurrency)

module.exports = router