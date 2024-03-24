const routes = require('express').Router();
const auth = require('../routers/auth');

routes.use('/auth', auth);

module.exports = routes;
