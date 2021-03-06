const express = require('express');
const logger = require('morgan');
const eventRoutes = require('./app/routes/eventRoutes');
const {
  hasEnoughIngredients,
} = require('./app/controllers/eventController.js');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const app = express();

const start = () => {
  // connection to mongodb
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  );

  app.use(logger('dev'));
  app.use(bodyParser.json());

  // private route
  app.use('/event', eventRoutes);

  app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
  });

  app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // handle errors
  app.use(function (err, req, res, next) {
    console.log('handling error');
    console.log(err);

    if (err.status === 404) res.status(404).json({ message: 'Not found' });
    else res.status(500).json({ message: 'Something looks wrong :( !!!' });
  });

  const port = process.env.PORT || 3000;

  app.listen(port, function () {
    console.log('Node server listening on port', port);
  });
};

start();
