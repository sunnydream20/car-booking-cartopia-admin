const mongoose = require('mongoose');

const HomeBannerSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});

// Create the model from the schema and export it
const HomeBanner = mongoose.model('HomeBanner', HomeBannerSchema);

module.exports = { HomeBanner};