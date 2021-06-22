const bottleRoutes = require('express').Router();
const connection = require('../db-config');

bottleRoutes.get('/:user_id/bottles', (req, res) => {
  const userId = req.params.user_id;
  connection.query(
    'SELECT bottle.id, bottle.name, bottle.user_id, bottle.reference_id from bottle INNER JOIN user ON user.id = bottle.user_id WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving a bottle from database');
      } else {
        res.json(results);
      }
    },
  );
});

bottleRoutes.post('/:user_id/bottles', (req, res) => {
  const {
    name, referenceId,
  } = req.body;
  const userId = req.params.user_id;
  connection.query(
    'INSERT INTO bottle(`name`, `user_Id`, `reference_Id`) VALUES (?, ?, ?)',
    [name, userId, referenceId],
    (err, result) => {
      if (err) {
        res.status(500).send('Error saving the bottle');
      } else {
        const newBottle = {
          id: result.insertId,
          name,
          referenceId,
        };
        res.status(201).send(newBottle);
      }
    },
  );
});

bottleRoutes.put('/:user_id/bottles/:id', (req, res) => {
  const userId = req.params.user_id;
  const bottleId = req.params.id;
  connection.query(
    'SELECT * from bottle WHERE id = ?',
    [bottleId, userId],
    (err, selectResults) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating the bottle');
      } else {
        const bottleFromDb = selectResults[0];
        if (bottleFromDb) {
          const bottlePropsToUpdate = req.body;
          connection.query(
            'UPDATE bottle SET ? WHERE id = ?',
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

bottleRoutes.delete('/:user_id/bottles/:id', (req, res) => {
  const bottleId = req.params.id;
  connection.query(
    'DELETE FROM bottle WHERE id = ?',
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

module.exports = bottleRoutes;
