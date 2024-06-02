const express = require("express");
const isLogin = require("../middlewares/isLogin");
const usersRoute = express.Router();
const {
  loginCtrl,
  registerCtrl,
  getUsersCtrl,
  updateUserCtrl,
  deleteUserCtrl,
} = require("../Controllers/users");

usersRoute.post("/login", loginCtrl);

usersRoute.post("/users", isLogin, registerCtrl);

usersRoute.get("/users", isLogin, getUsersCtrl);

usersRoute.put("/users/:id", isLogin, updateUserCtrl);

usersRoute.delete("/users/:id", isLogin, deleteUserCtrl);

module.exports = usersRoute;
