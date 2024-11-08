const express = require("express");  
const authenticateJWT = require("../controller/authenticateJWT");
const TodoModel = require("../model/todoModel");

const todoRoutes = express.Router();

todoRoutes.get("/", async (req, res) => {
  try {
    const tasks = await TodoModel.find({userId : req.headers.uid}); // Corrected variable usage
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

todoRoutes.post("/", async (req, res) => {
  try {
    const { title, description, date , userId} = req.body;
    const newTask = new TodoModel({
        title,
        description,
        date,
        completed: false ,
        userId
    });
    
    console.log(newTask);
    const savedTask = await newTask.save();
    res.send(savedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

todoRoutes.put("/:id", async (req, res) => {
  try {
    const task = await TodoModel.findOneAndUpdate(
      { _id: req.params.id },
      { completed: req.body.completed   },
      { new: true }
    );


    if (!task) return res.status(404).send({ message: "Task not found" });

    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

todoRoutes.put('/edit/:id', async (req, res) => {
  try {
    const task = await TodoModel.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    if (!task) return res.status(404).send({ message: "Task not found" });
    res.send(task);
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

todoRoutes.delete("/:id", async (req, res) => {
  try {
    const task = await TodoModel.findOneAndDelete({ _id: req.params.id });
    if (!task) return res.status(404).send({ message: "Task not found" });
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = todoRoutes;
