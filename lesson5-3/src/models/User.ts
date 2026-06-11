import mongoose from 'mongoose';

export interface IUser{
    name:string
    email:string
    address:string
    createdAt:Date
}

const userSchema = new mongoose.Schema<IUser>({
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
  // Embedded address
  address: {
    city: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User