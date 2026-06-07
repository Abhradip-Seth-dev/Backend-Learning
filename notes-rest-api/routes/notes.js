const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname,'../data/notes.json');

function readNotes(){
    if(!fs.existsSync(filepath)) return [];

    const data = fs.readFileSync(filepath,'utf-8');

    if (!data.trim()) return []
    return JSON.parse(data)
}
function writeNotes(notes) {
    fs.writeFileSync(filepath, JSON.stringify(notes))
}

router.get('/',(req,res,next)=>{
    try {
        const notes = readNotes()
        res.status(200).json({ notes })
      } catch(err) {
        next(err)
      }
})

router.post('/',(req,res,next)=>{
    try{
    const {title,content} = req.body;

    if(!title || !content){
        return res.status(400).json({error:"There must be both field required!!"});

    }

    const notes = readNotes();
    const newNote ={
        id:Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString()
    }
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json({ note: newNote });
}catch(err){
    next(err);
}
})
// GET single note
router.get('/:id', (req, res, next) => {
    try {
      const notes = readNotes()
      const note = notes.find(n => n.id === req.params.id)
  
      if (!note) {
        return res.status(404).json({ error: "Note not found" })
      }
  
      res.status(200).json({ note })
    } catch(err) {
      next(err)
    }
  })
  // PUT update a note
router.put('/:id', (req, res, next) => {
    try {
      const { title, content } = req.body
      const notes = readNotes()
  
      const index = notes.findIndex(n => n.id === req.params.id)
  
      if (index === -1) {
        return res.status(404).json({ error: "Note not found" })
      }
  
      notes[index] = {
        ...notes[index],
        title: title || notes[index].title,
        content: content || notes[index].content
      }
  
      writeNotes(notes)
  
      res.status(200).json({ note: notes[index] })
    } catch(err) {
      next(err)
    }
  })
  // DELETE a note
router.delete('/:id', (req, res, next) => {
    try {
      const notes = readNotes()
      const filtered = notes.filter(n => n.id !== req.params.id)
  
      if (notes.length === filtered.length) {
        return res.status(404).json({ error: "Note not found" })
      }
  
      writeNotes(filtered)
  
      res.status(200).json({ message: "Note deleted!" })
    } catch(err) {
      next(err)
    }
  })


module.exports = router