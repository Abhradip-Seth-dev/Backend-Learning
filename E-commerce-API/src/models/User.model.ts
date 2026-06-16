import mongoose from 'mongoose';
import { Iuser } from '../types';

// User     — name, email, password, role (admin/customer)
const userSchema = new mongoose.Schema<Iuser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer'
    }
})

const User = mongoose.model<Iuser>('User',userSchema);

export default User 