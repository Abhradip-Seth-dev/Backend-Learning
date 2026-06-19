import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";
import { successResponse } from "../utils/response";

export const register = async (req:Request,res:Response,next:NextFunction)=>{
    
    try{
        
        const {name,email,password,role} = req.body;

        const user = await registerService(name,email,password,role);

        res.status(201).json(successResponse(user,"User Created Succesfully"))

    }catch(err){
        next(err)
    }
}

export const login = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password}=req.body;
    
        const {token,user} = await loginService(email,password);
    
        res.status(200).json(successResponse({token,user},"User Logged in Succesfully"))

    }catch(err){
        next(err)
    }
}