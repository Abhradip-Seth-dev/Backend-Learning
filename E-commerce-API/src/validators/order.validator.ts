import z from "zod";

export const createOrderSchema = z.object({
    items:z.array(z.object({
        product:z.string().regex(/^[a-f\d]{24}$/i, 'Invalid product ID'),
        quantity:z.number().min(1)
    }))
})