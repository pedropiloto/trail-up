const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = {
  eventModel: mongoose.model("Event", eventSchema)
};
