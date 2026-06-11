// POST   /posts
// GET    /posts
// GET    /posts/:id
// PUT    /posts/:id
// DELETE /posts/:id
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const getAllPosts = require('../controllers/post.controller.js')
// GET all posts
router.get('/', getAllPosts)

// GET single post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
    if (!post) return res.status(404).json({ error: "Post not found" })
    res.status(200).json({ post })
  } catch(err) {
    next(err)
  }
})

// POST create post
router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json({ post })
  } catch(err) {
    next(err)
  }
})

// PUT update post
router.put('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!post) return res.status(404).json({ error: "Post not found" })
    res.status(200).json({ post })
  } catch(err) {
    next(err)
  }
})

// DELETE post
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ error: "Post not found" })
    res.status(200).json({ message: "Post deleted!" })
  } catch(err) {
    next(err)
  }
})

module.exports = router