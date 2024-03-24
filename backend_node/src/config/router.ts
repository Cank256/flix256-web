const routes = require('express').Router()
const authRoutes = require('../routers/Auth')
const userRoutes = require('../routers/User')

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)

module.exports = routes
