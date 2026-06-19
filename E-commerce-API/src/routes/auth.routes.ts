import express from 'express'
import { protect } from '../middleware/auth.middleware'

const router = express.Router()

router.post('/register',protect(registerSchema))