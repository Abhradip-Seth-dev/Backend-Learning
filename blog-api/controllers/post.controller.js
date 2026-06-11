const Post = require('../models/Post')

const getAllPosts = async(req,res,next)=>{
    try {
        const posts = await Post.find()
          .populate('author', 'name email')
          .select('title content createdAt author')
          .limit(10)
          .sort({ createdAt: -1 })
        res.status(200).json({ posts })
      } catch(err) {
        next(err)
     }
}


module.exports = getAllPosts