const { Router } = require("express");
const router = Router();
const {
  addDesc_QA,
  getDesc_QAs,
  getDesc_QAById,
  updateDesc_QA,
  deleteDesc_QA,
} = require("../controllers/Desc_QA.controller");
router.get = ("/", getDesc_QAs);
router.get = ("/:id", getDesc_QAById);
router.post = ("/", addDesc_QA);
router.put = ("/:id", updateDesc_QA);
router.delete = ("/:id", deleteDesc_QA);

module.exports = router;
