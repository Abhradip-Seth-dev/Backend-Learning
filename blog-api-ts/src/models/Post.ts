import mongoose from "mongoose"


export interface IPost{
  title:string,
  content:string,
  author:mongoose.Types.ObjectId,
  createdAt:Date
}
const postSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  // Referencing User
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Text index for search optimization
postSchema.index({ title: 'text', content: 'text' })

const Post = mongoose.model<IPost>('Post', postSchema)

export default Post