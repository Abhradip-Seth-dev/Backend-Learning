import { z} from 'zod'

export const registerSchema = z.object({
    name:z.string().min(2,'Name atleast 2 characters '),
    email:z.string().email('Invalid Email'),
    password:z.string().min(6,'Password Must be Atleast 6 characters'),
    role:z.enum(['admin','customer']).optional().default('customer')
})

export const loginSchema = z.object({
    email:z.string().email('Invalid Email'),
    password:z.string().min(6,'Password Must be Atleast 6 characters'),
})