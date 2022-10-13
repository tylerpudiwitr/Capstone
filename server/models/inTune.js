const mongoose = require("mongoose");

const tuneSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  crust: {
    type: String,
    required: true,
    enum: ["thin", "chicago", "deep-dish", "hella-thick"]
  },
  cheese: {
    type: String,
    validate: /^[A-Za-z0-9 ]*$/
  }
});

const Pizza = mongoose.model(`Pizza`, tuneSchema);

module.exports = Pizza;
