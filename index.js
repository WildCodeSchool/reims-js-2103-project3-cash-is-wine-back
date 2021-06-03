const express = require('express');
const connection = require('./db-config');

const app = express();

const port = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(`connected to database with threadId :  ${connection.threadId}`);
  }
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/bottles', (req, res) => {
  connection.query(
    'SELECT * FROM wine_bottle',
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
    estate, appellation, terroir, label, color, variety, type, category, reward, precision, year,
  } = req.body;
  connection.query(
    'INSERT INTO wine_bottle(`estate`, `appellation`, `terroir`, `label`, `color`, `variety`, `type`, `category`, `reward`, `precision`, `year`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [estate, appellation, terroir, label, color, variety, type, category, reward, precision, year],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the bottle');
      } else {
        const newBottle = {
          id: result.insertId,
          estate,
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
        };
        res.status(201).send(newBottle);
      }
    },
  );
});

app.delete('/bottles/:id', (req, res) => {
  const bottleId = req.params.id;
  connection.query(
    'DELETE FROM wine_bottle WHERE id = ?',
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
