const { Router } = require("express");
const router = Router();
const {
  addAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.controller");
router.get = ("/", getAuthors);
router.get = ("/:id", getAuthorById);
router.post = ("/", addAuthor);
router.put = ("/:id", updateAuthor);
router.delete = ("/:id", deleteAuthor);

module.exports = router;
