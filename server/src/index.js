// server.js
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const MongoConnection = require("./config/db");
const AuthRoute = require("./routes/AuthRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use(cors());
MongoConnection();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", AuthRoute);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
