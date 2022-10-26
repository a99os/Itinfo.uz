const { Router } = require("express");
const {
  addDesc,
  getDescs,
  getDescById,
  updateDesc,
  deleteDesc,
} = require("../controllers/description.controller");
const adminPolice = require("../middleware/adminPolice");
const router = Router();

router.post("/", adminPolice, addDesc);
router.get("/", getDescs);
router.get("/:id", getDescById);
router.put("/:id", adminPolice, updateDesc);
router.delete("/:id", adminPolice, deleteDesc);
module.exports = router;
