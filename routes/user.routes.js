const { Router } = require("express");
const {
  getUsers,
  getUserById,
  addUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
