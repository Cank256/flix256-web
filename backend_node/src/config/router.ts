const routes = require('express').Router()
const authRoutes = require('../routers/AuthRoutes')
const userRoutes = require('../routers/UserRoutes')
const movieRoutes = require('../routers/MovieRoutes')

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/movies', movieRoutes)

module.exports = routes
