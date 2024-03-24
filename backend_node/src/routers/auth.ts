const route = require('express').Router()

route.get('/', (req, res) => {
    res.send('Auth World!')
})

module.exports = route
