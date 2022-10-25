const { Router } = require("express");
const {
  getAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.controller");

const router = Router();
router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", addAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
