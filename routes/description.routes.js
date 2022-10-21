const { Router } = require("express");
const {
  addDesc,
  getDescs,
  getDescById,
  updateDesc,
  deleteDesc,
} = require("../controllers/description.controller");
const router = Router();

router.post("/", addDesc);
router.get("/", getDescs);
router.get("/:id", getDescById);
router.put("/:id", updateDesc);
router.delete("/:id", deleteDesc);
module.exports = router;
