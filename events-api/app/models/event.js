const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  created_by: {
    type: String,
    trim: true,
    required: true,
  },
  updated_by: {
    type: String,
    trim: true,
  },
});

module.exports = {
  eventModel: mongoose.model('Event', eventSchema),
};
