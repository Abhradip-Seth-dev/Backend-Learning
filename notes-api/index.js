const express = require("express");
const logger = require("./middleware/logger");
const notesRoutes = require("./routes/notes");

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/notes", notesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});