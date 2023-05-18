const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
router.route('/')
.get(userController.getAllUsers).post(userController.findUser)
router.route('/addUser').get(userController.getNewUserForm).post(userController.addUser)
router.get('editUser/:id',userController.getEditUser)


module.exports = router