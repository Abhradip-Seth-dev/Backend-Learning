const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password:{
    type:String,
    required:[true,'Password is required'],
    trim:true,
  },
  // Embedded address
  address: {
    city: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role:{
    type:String,
    enum:['user','admin','moderator'],
    default:'user'
  }
})

module.exports = mongoose.model('User', userSchema)