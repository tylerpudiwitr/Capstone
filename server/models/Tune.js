const mongoose = require("mongoose");

const tuneSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },

  genre: {
    type: String,
    validate: /^[A-Za-z0-9 ]*$/
  }
});

const Tune = mongoose.model(`Tune`, tuneSchema);

module.exports = Tune;
