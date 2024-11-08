const express = require("express");
const todoSchema = require("../model/todoModel"); // Corrected the variable name
const authenticateJWT = require("../controller/authenticateJWT");

const todoRoutes = express.Router();

todoRoutes.get("/", authenticateJWT, async (req, res) => {
  try {
    const tasks = await todoSchema.find({ email: req.user.email }); // Corrected variable usage
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todoRoutes.post("/", authenticateJWT, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new todoSchema({
      title,
      description,
      date,
      completed: false,
      email: req.user.email,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todoRoutes.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const task = await todoSchema.findOneAndUpdate(
      { _id: req.params.id, email: req.user.email },
      { completed: req.body.completed },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = todoRoutes;
