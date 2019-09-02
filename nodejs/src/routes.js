const { asyncHandler } = require('./tasks/async-service');

const express = require('express');

const routes = express.Router();

routes.get('/ping', (req, res) => {
  res.send('pong');
});

routes.get('/async', (req, res) => {
  if (!req.query.input) {
    res.status(400).send('Parameter "input" is required')
  }

  asyncHandler(req.query.input)
    .then(result => res.send(result))
    .catch(err => res.send(`Unexpected error ${err.message}`));
});

module.exports = routes;
