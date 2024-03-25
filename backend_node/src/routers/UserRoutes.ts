const userRoute = require('express').Router()
const UserController = require('../controllers/UserController')
const valid = require('../middlewares/validation')

// userRoute.get('/all', UserController.getAllUsers)
userRoute.get('/:id', valid.user, UserController.getUserById)
userRoute.put('/:id', valid.userUpdate, UserController.updateUser)
userRoute.delete('/:id', valid.user, UserController.deleteUser)

module.exports = userRoute
