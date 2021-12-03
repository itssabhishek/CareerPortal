const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const School = mongoose.model('SCHOOL', schoolSchema);

module.exports = School;
