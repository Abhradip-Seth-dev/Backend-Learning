export const successResponse = (data:any,message='success')=>({
    sucess:true,message,data
})
export const errorResponse = (message:string)=>({
    sucess:false,message,data:null
})