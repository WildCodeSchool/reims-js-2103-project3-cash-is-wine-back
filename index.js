require('dotenv').config();

// init the express app
const express = require('express');
const cors = require('cors');
const connection = require('./db-config');

const app = express();

app.use(cors());

const port = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(`connected to database with threadId :  ${connection.threadId}`);
  }
});

app.use(express.json());

app.use(cors());

// add routes
const routes = require('./routes');

app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
