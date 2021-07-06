const priceRoutes = require('express').Router();
const connection = require('../db-config');

priceRoutes.get('/', (req, res) => {
  const {
    type, appellation, year, reward,
  } = req.query;
  connection.query(
    'SELECT price FROM reference WHERE type = ? and appellation = ? and year = ? and reward = ? LIMIT 1',
    [type, appellation, year, reward],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving the reference from database');
      } else {
        res.json(results[0]);
      }
    },
  );
});

module.exports = priceRoutes;
