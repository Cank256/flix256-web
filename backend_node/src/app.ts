const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http').Server(app)
const morgan = require('morgan')

const router = require('./config/router')
const connectDB = require('./config/db')

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(router)
connectDB()

http.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
