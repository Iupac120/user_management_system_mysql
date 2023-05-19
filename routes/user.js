const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
router.route('/').get(userController.getAllUsers).post(userController.findUser)
router.route('/addUser').get(userController.getNewUserForm).post(userController.addUser)
router.route('/editUser/:id').get(userController.getEditUser).post(userController.updateUser)
router.get('/viewUser/:id',userController.viewAllUser)
router.get('/:id', userController.deleteUser)


module.exports = router