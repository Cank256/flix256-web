const app = require('express')();
const http = require('http').Server(app);
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

http.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});