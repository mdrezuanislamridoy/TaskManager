const { Register, Login, Logout } = require("../controller/AuthController");

const AuthRoute = require("express").Router();

AuthRoute.post("/signup", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/logout", Logout);

module.exports = AuthRoute;
