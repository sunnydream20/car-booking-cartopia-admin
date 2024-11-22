const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
    details: {
        type: [String]
    }}, 
    {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});

// Create the model from the schema and export it
const Detail = mongoose.model('Detail', DetailSchema);


module.exports = { Detail };