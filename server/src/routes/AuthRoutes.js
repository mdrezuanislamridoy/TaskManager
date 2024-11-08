const { Register, Login } = require("../controller/AuthController");

const AuthRoute = require("express").Router();

AuthRoute.post("/signup", Register);
AuthRoute.post("/login", Login);

module.exports = AuthRoute;
