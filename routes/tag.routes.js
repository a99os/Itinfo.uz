const { Router } = require("express");
const {
  addTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");
const router = Router();

router.get("/", getTags);
router.post("/", addTag);
router.get("/:id", getTagById);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);
module.exports = router;
