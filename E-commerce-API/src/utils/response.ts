export const successResponse =(data:any,message='success')=>({
    success:true,message,data
})
export const errorResponse =(message:string)=>({
    success:false,message,data:null
})