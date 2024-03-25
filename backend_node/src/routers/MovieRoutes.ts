const movieRoute = require('express').Router()
const MovieController = require('../controllers/MovieController')
const validMovie = require('../middlewares/validation')

movieRoute.get('/trending', MovieController.getAllTrendingMovies)
movieRoute.get('/now_playing', MovieController.getAllNowPlayingMovies)
movieRoute.get('/upcoming', MovieController.getAllUpcomingMovies)
movieRoute.get('/popular', MovieController.getAllPopularMovies)
movieRoute.get('/top_rated', MovieController.getAllTopRatedMovies)
movieRoute.get('/:id', validMovie.movie, MovieController.getMovie)

module.exports = movieRoute
