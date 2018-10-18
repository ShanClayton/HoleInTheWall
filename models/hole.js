const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: String,
    address: String,
    city: String,
    state: String,
    speciality: String,
    rating: { type: Number, required: true },
    reviews: String,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
