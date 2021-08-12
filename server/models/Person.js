const { Schema } = require('mongoose');

const personSchema = new Schema({
  accessionId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },

  surname: {
    type: String,
    required: true,
  },

  born: {
    type: String,

  },
  died: {
    type: String,
  },

});

module.exports = personSchema;
