import express, { Request, Response, NextFunction } from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Test route
app.get('/', (req: Request, res: Response): void => {
  res.json({ message: "TypeScript + Express working! 🚀" })
})

interface User {
    id: string
    name: string
    email: string
    role: 'user' | 'admin'
}
const users: User[] = [
    { id: "1", name: "Abhradip", email: "ab@gmail.com", role: "admin" },
    { id: "2", name: "Satirtha", email: "sa@gmail.com", role: "user" }
]

interface UserParams {
    id: string
}
interface CreateUserBody {
    name: string
    email: string
    role: 'user' | 'admin'
}

app.get('/users', (req: Request, res: Response): void => {
    res.json({ users })
})

app.get('/users/:id', (req: Request<UserParams>, res: Response): void => {
    const user = users.find(u => u.id === req.params.id)
    if (!user) {
      res.status(404).json({ error: "User not found" })
      return
    }
    res.json({ user })
})

app.post('/users', (
    req: Request<{}, {}, CreateUserBody>,
    res: Response
  ): void => {
    const { name, email, role } = req.body
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role
    }
    users.push(newUser)
    res.status(201).json({ user: newUser })
  })
// 404 handler
app.use((req: Request, res: Response): void => {
  res.status(404).json({ error: "Route not found" })
})

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})