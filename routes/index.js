const routes = require('express').Router();

// define the index route
routes.post('/', (req, res) => {
  console.log('A new request just hit the API !');
  res.send('Hello dear API client :)');
});

const loginRoute = require('./login');
const userRoutes = require('./users');
const bottleRoutes = require('./bottles');
const referenceRoutes = require('./references');
const uploadRoute = require('./upload');
const priceRoutes = require('./prices');

routes.use('/login', loginRoute);
routes.use('/users', userRoutes);
routes.use('/users', bottleRoutes);
routes.use('/references', referenceRoutes);
routes.use('/upload', uploadRoute);
routes.use('/prices', priceRoutes);

module.exports = routes;
