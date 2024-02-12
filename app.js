require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mainRoute = require('./routes/main');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

// Middlewares
app.use(express.json()); //Work with post request: req.body
app.use(express.static('./public'));

// Routes
app.use('/api/v1', mainRoute);

// Handling Errors
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
