const express = require("express");
const router = express.Router();

const {
  CreateUser,
  LoginUser,
  GetUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
} = require("../Controllers/UserController");

// Create User
router.post("/create", CreateUser);

// Login User
router.post("/login", LoginUser);

// Get All Users
router.get("/all", GetUsers);

// Get User By ID
router.get("/:id", GetUserById);

// Update User
router.put("/:id", UpdateUser);

// Delete User
router.delete("/:id", DeleteUser);

module.exports = router;