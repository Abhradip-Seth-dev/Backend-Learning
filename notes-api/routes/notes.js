const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirne, "../data/notes.json");

// Helper functions
const readNotes = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
};

// GET all notes
router.get("/", (req, res, next) => {
  try {
    const notes = readNotes();
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
});

// GET single note
router.get("/:id", (req, res, next) => {
  try {
    const notes = readNotes();
    const note = notes.find(n => n.id === req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
});

// CREATE note
router.post("/", (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const notes = readNotes();

    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString()
    };

    notes.push(newNote);
    writeNotes(notes);

    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
});

// UPDATE note
router.put("/:id", (req, res, next) => {
  try {
    const { title, content } = req.body;
    const notes = readNotes();

    const index = notes.findIndex(n => n.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    notes[index] = {
      ...notes[index],
      title: title || notes[index].title,
      content: content || notes[index].content
    };

    writeNotes(notes);

    res.status(200).json(notes[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE note
router.delete("/:id", (req, res, next) => {
  try {
    let notes = readNotes();

    const filtered = notes.filter(n => n.id !== req.params.id);

    if (notes.length === filtered.length) {
      return res.status(404).json({ message: "Note not found" });
    }

    writeNotes(filtered);

    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;