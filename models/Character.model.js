const { Schema, model } = require('mongoose');

const characterSchema = new Schema(
  {
    name: String,
    occupation: String,
    weapon: String,
  },
  {
    timestamps: true
  }
);

module.exports = model('Character', characterSchema);
