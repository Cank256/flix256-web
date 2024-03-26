const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http').Server(app)

const router = require('./config/router')
const connectDB = require('./config/db')

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Specify the client origin explicitly
    credentials: true, // Allowing credentials
};

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)
connectDB()

app.use((req, res, next) => {
    const err: any = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    if (err.status === 404) {
        let response = {
            message: err.message || 'Route Not Found.',
        }
        res.status(err.status).json(response)
    }
})

http.listen(8000, () => {
    console.log('Server is running on http://localhost:8000')
})
