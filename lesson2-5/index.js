const express = require('express');
const app = express();

app.use(express.json());


// ── Middleware 1: Logger ──
// Runs on every single request

app.use(function(req,res,next){
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

    next();
})

// ── Middleware 2: Auth Check ──
// Only protects specific routes

function requireAuth(req,res,next){
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "No token provided!" })
      }
    
      if (token !== 'mysecrettoken') {
        return res.status(403).json({ error: "Invalid token!" })
      }
    
      next() ;
}
// Public route — no auth needed
app.get('/', function(req, res) {
    res.json({ message: "Welcome! This is public." })
  })

// Protected route — auth required
app.get('/profile', requireAuth, function(req, res) {
    res.json({ message: "This is your profile!" })
  })  

  app.listen(3000)