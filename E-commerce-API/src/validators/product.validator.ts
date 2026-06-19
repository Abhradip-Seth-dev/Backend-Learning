import z from "zod"

export const createProductSchema = z.object({
    name:z.string().min(2,'Name Must be atleast 2 characters'),
    description:z.string().min(2,'Name Must be atleast 2 characters'),
    price:z.number().min(0,'Price Cant be Negetive'),
    stock:z.number().min(0,'Stock Cant be Negetive'),
})
export const updateProductSchema = z.object({
    name:z.string().min(2,'Name Must be atleast 2 characters').optional(),
    description:z.string().min(2,'Name Must be atleast 2 characters').optional(),
    price:z.number().min(0,'Price Cant be Negetive').optional(),
    stock:z.number().min(0,'Stock Cant be Negetive').optional(),
})