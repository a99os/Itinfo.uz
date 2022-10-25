const { Router } = require("express");
const router = Router();
const {
  addTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic.controller");
router.get("/", getTopics);
router.get("/:id", getTopicById);
router.post("/", addTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
