import mongoose from 'mongoose';

import { Iuser } from '../types';

const userSchema = new mongoose.Schema<Iuser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:['admin','company','candidate'],
        default:'candidate'
    }
    
},{timestamps:true})

const User =  mongoose.model<Iuser>('User',userSchema);

export default User