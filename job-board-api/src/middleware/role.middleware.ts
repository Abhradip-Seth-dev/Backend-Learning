import { Response,NextFunction } from "express";
import { AuthRequest } from "../types";


export const restrictTo = (...roles:string[])=>{
    return (req:AuthRequest,res:Response,next:NextFunction)=>{
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({success:false,message:'Access Denied!'})
        }
        next();
    }
}
