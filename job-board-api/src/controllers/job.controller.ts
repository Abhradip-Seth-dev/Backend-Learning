import { createJobService, deleteJobService, getAllJobsService, getJobByIdService, updateJobService } from "../services/job.service";
import { AuthRequest } from "../types";
import { Response,NextFunction } from "express";
import { successResponse } from "../utils/response";
import { AppError } from "../utils/AppError";

export const getAllJobs = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
       const jobs = await getAllJobsService();
       res.status(200).json(successResponse(jobs,'Here are the Jobs'));

    }catch(err){
        next(err)
    }
}

export const getJobById = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const jobId = req.params.id;

        const job = await getJobByIdService(jobId as string);

        if(!job) throw new AppError('No Job Found',403);

        return res.status(200).json(successResponse(job,'here is the job'))
    }catch(err){
        next(err)
    }
}

export const createJob = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const {title,description} = req.body;
        const companyId = req.user?.id;

        const job = await createJobService(title,description,companyId as string);

        return res.status(201).json(successResponse(job,'job Created succesfully'))
    }catch(err){
        next(err)
    }

}
export const updateJob = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const companyId = req.user?.id;
        const jobId = req.params.id;
        const data = req.body;

        const job = await updateJobService(jobId as string,companyId as string,data)

        return res.status(200).json(successResponse(job,'job updated succesfully'))
    }catch(err){
        next(err)
    }

}
export const deleteJob = async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const companyId = req.user?.id;
        const jobId = req.params.id;

        const job = await deleteJobService(jobId as string ,companyId as string)

        return res.status(200).json(successResponse(job,'job deleted succesfully'))
    }catch(err){
        next(err)
    }

}