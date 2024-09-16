const mongoose = require('mongoose');

const bragSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true
  },
  brag: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  created_date: {
    type: Date,
    required: true
  },
  created_time: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Brag', bragSchema);