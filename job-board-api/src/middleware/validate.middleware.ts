import {ZodSchema} from 'zod';
import {Request,Response,NextFunction} from 'express';

export const validate = (Schema:ZodSchema)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const result = Schema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({errors:result.error})
        }

        req.body = result.data

        next();
    }
}