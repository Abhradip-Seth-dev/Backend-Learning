import User from "../models/User.model";
import { AppError } from "../utils/AppError";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
export const registerService = async(name:string,email:string,password:string,role:string)=>{
    const existingUser = await User.findOne({email})

    if(existingUser) throw new AppError("Email Already Exists",400);

    const hashedPassWord = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hashedPassWord,
        role:role as 'admin'|'customer'
    })

    const userObject = user.toObject()
    delete (userObject as any).password
    return userObject


}

export const loginService = async (email:string,password:string)=>{
    const user = await User.findOne({email});

    if(!user) throw new AppError("User not found",401);

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) throw new AppError("Invalid PassWord",401);
    const token = jwt.sign({
        id:user._id,role:user.role
    },process.env.JWT_SECRET as string,{expiresIn:'7d'});

    const userObject = user.toObject()
    delete (userObject as any).password
    
    return {token,user:userObject}
}