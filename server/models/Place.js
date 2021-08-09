const { Schema } = require('mongoose');

const placeSchema = new Schema({
    accessionId: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,

    },
    dateBuilt: {
        type: String,
    },
});

module.exports = placeSchema;
