const authRoute = require('express').Router()
const AuthController = require('../controllers/AuthController')
const validAuth = require('../middlewares/Validation')

authRoute.post('/signup', validAuth.signup, AuthController.signup)
authRoute.post('/login', validAuth.login, AuthController.login)

module.exports = authRoute
