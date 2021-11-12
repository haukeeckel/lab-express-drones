const express = require('express');
const router = express.Router();
const DroneModel = require('../models/Drone.model');

// require the Drone model here

router.get('/drones', (_, res) => {
  // Iteration #2: List the drones
  DroneModel.find()
    .then((drones) => {
      res.render('drones/list', { drones });
    })
    .catch((err) => {});
});

router.get('/drones/create', (_, res) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form.hbs');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  DroneModel.create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones');
    })
    .catch((err) => {
      next('Creation failed', err);
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;

  DroneModel.findById(id)
    .then((drone) => {
      res.render('./drones/update-form.hbs', { drone });
    })
    .catch(() => {
      next('Fetch failed');
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { name, propellers, maxSpeed } = req.body;
  const { id } = req.params;

  DroneModel.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones');
    })
    .catch(() => {
      next('Updating failed');
    });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;

  DroneModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/drones');
    })
    .catch(() => {
      next('Deleting failed');
    });
});

module.exports = router;
