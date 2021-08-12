const { Schema } = require('mongoose');

const itemSchema = new Schema({
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
});

module.exports = itemSchema;