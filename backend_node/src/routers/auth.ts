const route = require('express').Router()
const AuthController = require('../controllers/AuthController')
const Valid = require('../middlewares/validation')

route.get('/', (req: any, res: any) => {
    res.send('Auth World!')
})

route.post('/signup', Valid.signup, AuthController.signup)
route.post('/login', Valid.login, AuthController.login)

module.exports = route
