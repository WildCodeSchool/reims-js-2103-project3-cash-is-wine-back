const referenceRoutes = require('express').Router();
const connection = require('../db-config');

referenceRoutes.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM reference',
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving the reference from database');
      } else {
        res.json(results);
      }
    },
  );
});

referenceRoutes.post('/', (req, res) => {
  const {
    appellation, terroir, label, color, variety, type, category, reward, precision, year, price,
  } = req.body;
  connection.query(
    'INSERT INTO reference(`appellation`, `terroir`, `label`, `color`, `variety`, `type`, `category`, `reward`, `precision`, `year`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
    [appellation, terroir, label, color, variety, type, category, reward, precision, year, price],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the reference');
      } else {
        const newReference = {
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
        res.status(201).send(newReference);
      }
    },
  );
});

referenceRoutes.put('/:id', (req, res) => {
  const referenceId = req.params.id;
  connection.query(
    'SELECT * FROM reference WHERE id = ?',
    [referenceId],
    (err, selectResults) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating the reference');
      } else {
        const referenceFromDb = selectResults[0];
        if (referenceFromDb) {
          const referencePropsToUpdate = req.body;
          connection.query(
            'UPDATE reference SET ? WHERE id = ?',
            [referencePropsToUpdate, referenceId],
            (err) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error updating the reference');
              } else {
                const updated = { ...referenceFromDb, ...referencePropsToUpdate };
                res.status(200).send(updated);
              }
            },
          );
        } else {
          res.status(404).send(`Reference with id ${referenceId} not found.`);
        }
      }
    },
  );
});

referenceRoutes.delete('/:id', (req, res) => {
  const referenceId = req.params.id;
  connection.query(
    'DELETE FROM reference WHERE id = ?',
    [referenceId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a reference');
      } else {
        res.status(200).send('Reference deleted!');
      }
    },
  );
});

module.exports = referenceRoutes;
