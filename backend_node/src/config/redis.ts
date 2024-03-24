require('dotenv').config();
const Redis = require('ioredis');

// Create a new Redis instance
const redisServer = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    keyPrefix: process.env.CACHE_KEY_PREFIX,
});

module.exports = redisServer;
