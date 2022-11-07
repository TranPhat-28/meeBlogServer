const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
require('dotenv').config()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var cors = require('cors')

app.use(cors())

// Connect to MongoDB
// MongoDB connection
const db = process.env.DATABASE_URL;
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'))
.catch(e => console.log(e.message));

app.get('/', (req, res) => {
    res.send('Hello')
})

// Fetch all blogs
app.get('/blogs', (req, res) => {
    Blog.find().then(data => {
        res.json(data)
    })
})

// POST to create new blog
app.post('/blogs', (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    })

    newBlog.save().then(() => {
        res.sendStatus(200)
    })
    .catch(e => {
        console.log(e)
        res.sendStatus(500)
    })
})

// POST to add comment
app.post('/blogs/:id', (req, res) => {
    Blog.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: req.body.comment } })
    .then(() => {
        res.sendStatus(200)
    })
    .catch(e => {
        console.log(e)
        res.sendStatus(500)
    })
})

// Fetch blog's comment
app.get('/comments/:id/:page', (req, res) => {
    Blog.findOne({ _id: req.params.id })
    .then((blog) => {
        const arr = blog.comment
        const resArr = arr.slice((req.params.page - 1) * 3, (req.params.page - 1) * 3 + 3)
        res.json(resArr)
    })
    .catch(e => {
        console.log(e)
        res.sendStatus(500)
    })
})

// GET blogs content
app.get('/view/:id', (req, res) => {
    Blog.findOne({_id: req.params.id}).then((blog) => {
        //console.log(blog)
        res.json(blog)
    })
    .catch(e => {
        console.log(e.message)
        res.sendStatus(500)
    })
})

// Delete blogs
app.delete('/blogs/:id', (req, res) => {
    Blog.deleteOne({ _id: req.params.id}).then(() => {
        res.sendStatus(200)
    })
    .catch(e => { 
        console.log(e.message)
        res.sendStatus(500)
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})
