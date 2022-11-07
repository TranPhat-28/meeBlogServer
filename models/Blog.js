const mongoose = require('mongoose')

// Define schema
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    datePosted: {
        type: Date,
        default: Date.now()
    },
    comment: {
        type: [ String ],
    }
})

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;