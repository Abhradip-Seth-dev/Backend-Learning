import Job from "../models/job.model"
import { AppError } from "../utils/AppError";

export const getAllJobsService = async ()=>{
    const jobs = await Job.find({status:'open'}).populate('company','name email');
    return jobs;
}

export const createJobService = async (title:string,description:string,companyId:string)=>{
    const job = await Job.create({
        title,
        description,
        company:companyId,
    })
    return job;
}

export const getJobByIdService = async (jobId:string)=>{
    const job = await Job.findById(jobId).populate('company','name email');

    if(!job) throw new AppError('job not found',404);

    return job;
}

export const updateJobService = async (jobId:string,companyId:string,data:object)=>{
    const job = await Job.findById(jobId).populate('company','name email');

    if(!job) throw new AppError('job not found',404);

    if(job.company.toString()!==companyId) throw new AppError('Not Authorised',403);

    return await Job.findByIdAndUpdate(jobId,data,{new:true});
    
}
export const deleteJobService = async (jobId:string,companyId:string)=>{
    const job = await Job.findById(jobId).populate('company','name email');

    if(!job) throw new AppError('job not found',404);

    if(job.company.toString()!==companyId) throw new AppError('Not Authorised',403);

    return await Job.findByIdAndDelete(jobId);
    
}