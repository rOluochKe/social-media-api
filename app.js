const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// db connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`);
});

// Routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Middleware
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(cookieParser());

// Validation
app.use(expressValidator());

// App routes
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Unauthorized!' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`);
});