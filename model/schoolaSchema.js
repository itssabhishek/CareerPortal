const mongoose = require('mongoose');

const schoolaSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const Schoola = mongoose.model('SCHOOLA', schoolaSchema);

module.exports = Schoola;
