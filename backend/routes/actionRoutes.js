const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const {getActions, createAction, updateAction, deleteAction} = require('../controllers/actionController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/:id').get(protect,getActions).post(protect,createAction).put(protect, updateAction).delete(protect, deleteAction)
// router.route('/:id').put(protect,updateInvestment).delete(protect,deleteInvestment)

module.exports = router