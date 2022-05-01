const mongoose = require('mongoose');

const fields = {
  name: {
    type: String,
    required: true,
    default: 'Anónimo',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
};

const schema = new mongoose.Schema(fields);

module.exports = {
  Visitor: mongoose.model('Visitor', schema),
};
