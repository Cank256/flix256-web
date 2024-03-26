const routes = require('express').Router()
const authRoutes = require('../routers/AuthRoutes')
const userRoutes = require('../routers/UserRoutes')
const movieRoutes = require('../routers/MovieRoutes')
const tvShowRoutes = require('../routers/TvShowRoutes')
const searchRoutes = require('../routers/SearchRoutes')

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/movies', movieRoutes)
routes.use('/tv', tvShowRoutes)
routes.use('/search', searchRoutes)

module.exports = routes
