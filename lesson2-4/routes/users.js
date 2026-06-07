const express = require('express');
const router = express.Router();


const users = [
    { id: 1, name: "Abhradip", role: "developer" },
    { id: 2, name: "Satirtha", role: "designer" }
  ]
  
  // GET all users
  // router.get('/users', function(req, res) {
  //   res.json({ users })
    
  // })
  router.get('/', function(req, res) {
      const role = req.query.role;
      if(!role) res.json({users})
    const user = users.find(u=>u.role==role);
    console.log(user);
    res.json({ user })
    
  })
  
  
  // GET one user by id
  router.get('/:id', function(req, res) {
    const user = users.find(u => u.id === Number(req.params.id))
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json({ user })
  })
  
  // POST — create new user
  router.post('/', function(req, res) {
    const { name, role } = req.body
    if (!name || !role) {
      return res.status(400).json({ error: "Name and role are required" })
    }
    const newUser = { id: users.length + 1, name, role }
    users.push(newUser)
    res.status(201).json({ message: "User created!", user: newUser })
  })
  
  // PUT — update a user completely
  router.put('/:id', function(req, res) {
    const index = users.findIndex(u => u.id === Number(req.params.id))
    if (index === -1) {
      return res.status(404).json({ error: "User not found" })
    }
    const { name, role } = req.body
    users[index] = { id: Number(req.params.id), name, role }
    res.json({ message: "User updated!", user: users[index] })
  })
  
  // DELETE — remove a user
  router.delete('/:id', function(req, res) {
    const index = users.findIndex(u => u.id === Number(req.params.id))
    if (index === -1) {
      return res.status(404).json({ error: "User not found" })
    }
    const deleted = users.splice(index, 1)
    res.json({ message: "User deleted!", user: deleted[0] })
  })

  module.exports = router