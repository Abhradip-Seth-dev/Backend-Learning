import { NextFunction, Request,Response } from "express";

function logger(req:Request,res:Response,next:NextFunction){
    console.log(`${req.url} ${res.status}`);
    next();
    
}
export default logger