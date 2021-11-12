// Iteration #1
const { Schema, model } = require('mongoose');

const DroneSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  propellers: {
    type: Number,
    require: true,
    min: 1,
  },
  maxSpeed: {
    type: Number,
    require: true,
    min: 1,
  },
});

const DroneModel = model('Drone', DroneSchema);

module.exports = DroneModel;
