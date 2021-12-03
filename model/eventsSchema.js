const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Events = mongoose.model('EVENTS', eventsSchema);

module.exports = Events;
