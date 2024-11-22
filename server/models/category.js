const mongoose = require('mongoose');
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true, // Indicates this field is required
    },
    typeDes: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    doors: {
        type: Number,
        required: true,
    },
    bags: {
        type: Number,
    },
    snow: {
        type: String,
        required: true,
    },
    nowDayPrice: {
        type: Number,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    details: {
        type: [String]
    },
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});

// Create the model from the schema and export it
const Category = mongoose.model('Category', categorySchema);

const validate = (data) => {
	const schema = Joi.object({
		type: Joi.string().required().label("Type"),
		typeDes: Joi.string().required().label("Type Description"),
		doors: Joi.number().required().label("Door Number"),
		bags: Joi.number().required().label("Bags Number"),
		snow: Joi.string().required().label("Snow"),
		seats: Joi.number().required().label("Seats"),
		imgUrl: Joi.string().required().label("Image Url"),
		nowDayPrice: Joi.number().required().label("Now Day Price"),
	});
	return schema.validate(data);
};

module.exports = { Category, validate };