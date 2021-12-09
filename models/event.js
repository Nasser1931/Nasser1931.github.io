const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,

    },
    content: {
        type: String,

    },
    author: {
        type: String,

    }

});

module.exports = mongoose.model('Blog', blogSchema)