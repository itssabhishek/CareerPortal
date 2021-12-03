const mongoose = require('mongoose');

const schoolwtdSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const Schoolwtd = mongoose.model('SCHOOLWTD', schoolwtdSchema);

module.exports = Schoolwtd;
