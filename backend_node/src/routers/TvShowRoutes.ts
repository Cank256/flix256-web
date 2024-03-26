const tvShowRoute = require('express').Router()
const TvShowController = require('../controllers/TvShowController')
const validTv = require('../middlewares/Validation')

tvShowRoute.get('/trending', TvShowController.getAllTrendingTvShows)
tvShowRoute.get('/airing_today', TvShowController.getAllAiringTodayTvShows)
tvShowRoute.get('/on_air', TvShowController.getAllOnAirTvShows)
tvShowRoute.get('/popular', TvShowController.getAllPopularTvShows)
tvShowRoute.get('/top_rated', TvShowController.getAllTopRatedTvShows)
tvShowRoute.get('/:id(\\d+)', validTv.tv, TvShowController.getTvShow)
tvShowRoute.get(
    '/episodes',
    validTv.episode,
    TvShowController.getTvShowEpisodes,
)
tvShowRoute.get(
    '/recommended',
    validTv.tvRecommendation,
    TvShowController.getRecommendations,
)

module.exports = tvShowRoute
