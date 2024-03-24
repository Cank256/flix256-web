const userRoute = require('express').Router()
const UserController = require('../controllers/UserController')
// const validUser = require('../middlewares/validation')

userRoute.get('/all', UserController.getAllUsers)
userRoute.get('/:id', UserController.getUserById)
userRoute.put('/:id', UserController.updateUser)
userRoute.delete('/:id', UserController.deleteUser)

module.exports = userRoute
