const express = require('express')
const app = express()

app.use(express.json())

// Logger middleware
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Normal routes
app.get('/', function(req, res) {
  res.json({ message: "Home page" })
})

// Route that might fail
app.get('/users/:id', function(req, res, next) {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      // Create a custom error and pass to error handler
      const err = new Error("ID must be a number!")
      err.status = 400
      return next(err)
    }

    const users = [
      { id: 1, name: "Abhradip" },
      { id: 2, name: "Satirtha" }
    ]

    const user = users.find(u => u.id === id)

    if (!user) {
      const err = new Error("User not found!")
      err.status = 404
      return next(err)
    }

    res.json({ user })

  } catch(err) {
    next(err) // unexpected errors go here
  }
})

// Route that throws unexpectedly
app.get('/crash', function(req, res, next) {
  try {
    throw new Error("Something randomly broke!")
  } catch(err) {
    next(err)
  }
})

// 404 handler — unknown routes
app.use(function(req, res, next) {
  const err = new Error("Route not found!")
  err.status = 404
  next(err)
})

// ── ERROR HANDLING MIDDLEWARE ──
// Must be LAST, must have 4 parameters
app.use(function(err, req, res, next) {
  const statusCode = err.status || 500
  
  console.error(`❌ Error: ${err.message}`)

  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  })
})

app.listen(3000, function() {
  console.log('🚀 Server running on http://localhost:3000')
})