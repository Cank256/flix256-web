const searchRoute = require('express').Router()
const searchController = require('../controllers/SearchController')
const searchValid = require('../middlewares/Validation')

searchRoute.get('/', searchValid.search, searchController.search)

module.exports = searchRoute
