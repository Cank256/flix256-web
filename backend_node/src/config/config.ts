require('dotenv').config()

const config = {
    apiUrl: process.env.TMDB_URL,
    apiKey: process.env.TMDB_API_KEY,
}

module.exports = config
