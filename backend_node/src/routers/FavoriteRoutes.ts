const favoriteRoute = require('express').Router()
const FavoriteController = require('../controllers/FavoriteController')
const validFavorite = require('../middlewares/Validation')

favoriteRoute.post('/', validFavorite.favorite, FavoriteController.addFavorite)
favoriteRoute.delete('/', validFavorite.favoriteRemove, FavoriteController.removeFavorite)
favoriteRoute.get('/:user_id', validFavorite.favoriteGet, FavoriteController.getFavorites)

module.exports = favoriteRoute