const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
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

// Gets Routes
const postRoutes = require('./routes/post');

// Middleware
app.use(morgan('dev'));

// App routes
app.use('/', postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`);
});