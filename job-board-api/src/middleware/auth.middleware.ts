import { AuthRequest } from "../types";
import jwt from 'jsonwebtoken'
import { Response,NextFunction } from "express";
import dotenv from 'dotenv'
dotenv.config()

export const protect = (req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ success: false, message: 'No token provided' })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string }
        req.user = decoded
        next()

    }catch(err){
        return res.status(401).json({ success: false, message: 'Invalid Token' })
    }
}