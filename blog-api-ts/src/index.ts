import dotenv from 'dotenv'
dotenv.config()

import express, {
  Request,
  Response,
  NextFunction,
  Application,
} from 'express'
import mongoose from 'mongoose'

import logger from './middleware/logger'
import userRouter from './routes/users'
import postRouter from './routes/posts'

const app: Application = express()

app.use(express.json())
app.use(logger)

app.use('/users', userRouter)
app.use('/posts', postRouter)

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction): void => {
  const err = new Error('Route not found!') as Error & {
    status?: number
  }

  err.status = 404
  next(err)
})

// Centralized Error Handler
app.use(
  (
    err: Error & { status?: number },
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500,
      },
    })
  }
)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ MongoDB Connected!!')

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on ${process.env.PORT}`)
    })
  })
  .catch((err: Error) => {
    console.error('❌ Connection failed:', err.message)
    process.exit(1)
  })