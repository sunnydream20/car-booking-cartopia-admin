const mongoose = require('mongoose');

const HomeSliderSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});

// Create the model from the schema and export it
const HomeSlider = mongoose.model('HomeSlider', HomeSliderSchema);

module.exports = { HomeSlider};