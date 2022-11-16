const mongoose = require('mongoose');

const productsShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    imagen:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Products',productsShema)