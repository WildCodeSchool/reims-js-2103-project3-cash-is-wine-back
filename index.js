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

app.get('/bottles', (req, res) => {
  connection.query(
    'SELECT * FROM reference',
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving a bottle from database');
      } else {
        res.json(results);
      }
    },
  );
});

app.post('/bottles', (req, res) => {
  const {
    appellation, terroir, label, color, variety, type, category, reward, precision, year, price,
  } = req.body;
  connection.query(
    'INSERT INTO reference(`appellation`, `terroir`, `label`, `color`, `variety`, `type`, `category`, `reward`, `precision`, `year`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
    [appellation, terroir, label, color, variety, type, category, reward, precision, year, price],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the bottle');
      } else {
        const newBottle = {
          id: result.insertId,
          appellation,
          terroir,
          label,
          color,
          variety,
          type,
          category,
          reward,
          precision,
          year,
          price,
        };
        res.status(201).send(newBottle);
      }
    },
  );
});

app.put('/bottles/:id', (req, res) => {
  const bottleId = req.params.id;
  connection.query(
    'SELECT * FROM reference WHERE id = ?',
    [bottleId],
    (err, selectResults) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating the bottle');
      } else {
        const bottleFromDb = selectResults[0];
        if (bottleFromDb) {
          const bottlePropsToUpdate = req.body;
          connection.query(
            'UPDATE reference SET ? WHERE id = ?',
            [bottlePropsToUpdate, bottleId],
            (err) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error updating the bottle');
              } else {
                const updated = { ...bottleFromDb, ...bottlePropsToUpdate };
                res.status(200).send(updated);
              }
            },
          );
        } else {
          res.status(404).send(`Bottle with id ${bottleId} not found.`);
        }
      }
    },
  );
});

app.delete('/bottles/:id', (req, res) => {
  const bottleId = req.params.id;
  connection.query(
    'DELETE FROM reference WHERE id = ?',
    [bottleId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a bottle');
      } else {
        res.status(200).send('Bottle deleted!');
      }
    },
  );
});

module.exports = app;
