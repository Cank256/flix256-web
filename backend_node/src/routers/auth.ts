const route = require('express').Router()
const AuthController = require('../controllers/AuthController')

route.get('/', (req: any, res: any) => {
    res.send('Auth World!')
})

route.post('/signup', AuthController.signup)
route.post('/login', AuthController.login)

module.exports = route
