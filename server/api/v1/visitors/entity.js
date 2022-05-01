const mongoose = require('mongoose');

const fields = {
  name: {
    type: String,
    required: true,
    default: 'Anónimo',
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
};

const schema = new mongoose.Schema(fields);

module.exports = {
  Visitor: mongoose.model('Visitor', schema),
};
