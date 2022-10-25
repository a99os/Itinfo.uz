const { Router } = require("express");
const {
  getDesc_QAs,
  getDesc_QAById,
  addDesc_QA,
  updateDesc_QA,
  deleteDesc_QA,
} = require("../controllers/Desc_QA.controller");
const router = Router();

router.get("/", getDesc_QAs);
router.get("/:id", getDesc_QAById);
router.post("/", addDesc_QA);
router.put("/:id", updateDesc_QA);
router.delete("/:id", deleteDesc_QA);

module.exports = router;
