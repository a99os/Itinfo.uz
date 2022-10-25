const { Router } = require("express");
const {
  getASs,
  getASById,
  addAS,
  updateAS,
  deleteAS,
} = require("../controllers/author_social.controller");

const router = Router();

router.get("/", getASs);
router.get("/:id", getASById);
router.post("/", addAS);
router.put("/:id", updateAS);
router.delete("/:id", deleteAS);

module.exports = router;
