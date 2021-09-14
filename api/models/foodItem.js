const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
    },
    price:{
        type: Number,
    },
    description: {
        type: String,
    },
    catagory: {
        type: String,
    },
    updated: {type: Date, default: Date.now},
});

module.exports = mongoose.model('FoodItem', foodSchema);