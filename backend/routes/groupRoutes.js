const express = require('express')
const { appendFile } = require('fs')
const router = express.Router()
const {getGroups, createGroup, updateGroup, deleteGroup} = require('../controllers/groupController')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect,getGroups).post(protect,createGroup)
router.route('/:id').put(protect,updateGroup).delete(protect,deleteGroup)

module.exports = router