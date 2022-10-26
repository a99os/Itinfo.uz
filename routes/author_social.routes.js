const { Router } = require("express");
const {
  getASs,
  getASById,
  addAS,
  updateAS,
  deleteAS,
} = require("../controllers/author_social.controller");
const adminPolice = require("../middleware/adminPolice");

const router = Router();

router.get("/", getASs);
router.get("/:id", getASById);
router.post("/", adminPolice, addAS);
router.put("/:id", adminPolice, updateAS);
router.delete("/:id", adminPolice, deleteAS);

module.exports = router;
