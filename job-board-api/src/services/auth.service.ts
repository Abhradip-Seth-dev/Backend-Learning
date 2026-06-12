import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { AppError } from '../utils/AppError'
import dotenv from 'dotenv'
dotenv.config();

export const registerService = async (name:string,email:string,password:string,role:string)=>{
    const existingUser = await User.findOne({email});

    if(existingUser) throw new AppError("Email is already registered",400)

    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role:role as 'admin'|'company'|'candidate',

    })

    const userObject = user.toObject()
    delete (userObject as any).password
    return userObject
}

export const loginService = async (email:string,password:string)=>{
    const user = await User.findOne({email});

    if(!user) throw new AppError('Invalid credentials',401);

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) throw new AppError('Invalid Credentials',401);

    const token = jwt.sign({
        id:user._id,role:user.role
    },process.env.JWT_SECRET as string,{expiresIn:'7d'});

    return {token,user}

}