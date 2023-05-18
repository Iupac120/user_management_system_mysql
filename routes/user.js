const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
router.route('/')
.get(userController.getAllUsers).post(userController.findUser)
router.post('/addUser',userController.addUser)
router.patch('editUser/:id',)
module.exports = router