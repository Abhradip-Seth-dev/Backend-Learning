import mongoose from "mongoose";
import { Request } from "express";

export interface AuthRequest extends Request{
    user?:{
        id:string,
        role:string
    }
}
export interface Iuser{
    name:string,
    email:string,
    password:string,
    role:'admin'|'company'|'candidate',
}

export interface Ijob{
    title:string,
    description:string,
    company:mongoose.ObjectId,
    status:'open'|'close',
    
}
export interface Iapplication{
    candidate:mongoose.ObjectId,
    job:mongoose.ObjectId,
    status:'pending'|'approved'|'rejected',
    
}