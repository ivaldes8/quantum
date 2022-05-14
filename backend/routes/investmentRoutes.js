const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const {getInvestments, createInvestment, updateInvestment, deleteInvestment} = require('../controllers/investmentController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getInvestments).post(protect,createInvestment)
router.route('/:id').put(protect,updateInvestment).delete(protect,deleteInvestment)

module.exports = router