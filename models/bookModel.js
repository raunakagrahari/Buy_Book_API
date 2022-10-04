const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
    bookname:{
        type: String,
        required:[true,'Book should have name']
    },
    author:{
        type:String,
        required:[true,'Author should have name']
    },
    price:{
        type:Number,
        required:[true,'Price should be given']
    }
})

const Book = new mongoose.model('Book',bookSchema);

module.exports = Book