const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
