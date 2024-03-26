const routes = require('express').Router()
const authRoutes = require('../routers/AuthRoutes')
const userRoutes = require('../routers/UserRoutes')
const movieRoutes = require('../routers/MovieRoutes')
const tvShowRoutes = require('../routers/TvShowRoutes')
const searchRoutes = require('../routers/SearchRoutes')
const favoriteRoutes = require('../routers/FavoriteRoutes')

routes.use('/auth', authRoutes)
routes.use('/users', userRoutes)
routes.use('/movies', movieRoutes)
routes.use('/tv', tvShowRoutes)
routes.use('/search', searchRoutes)
routes.use('/favorite', favoriteRoutes)

module.exports = routes
