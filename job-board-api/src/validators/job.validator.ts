import {z} from 'zod'

export const createJobSchema = z.object({
    title:z.string().min(3, 'Title must be at least 3 characters'),
    description:z.string().min(10, 'Description must be at least 10 characters'),
})

export const updateJobSchema = z.object({
    title:z.string().min(3, 'Title must be at least 3 characters').optional(),
    description:z.string().min(10, 'Description must be at least 10 characters').optional(),
    status: z.enum(['open', 'closed']).optional().default('open')
})