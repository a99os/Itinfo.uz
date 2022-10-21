const { Router } = require("express");
const {
  addDesc_Topic,
  getDesc_Topics,
  getDesc_TopicById,
  updateDesc_Topic,
  deleteDesc_Topic,
} = require("../controllers/desc_topic.controller");
const router = Router();

router.get("/", getDesc_Topics);
router.post("/", addDesc_Topic);
router.get("/:id", getDesc_TopicById);
router.put("/:id", updateDesc_Topic);
router.delete("/:id", deleteDesc_Topic);
module.exports = router;
