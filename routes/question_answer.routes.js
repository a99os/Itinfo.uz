const { Router } = require("express");
const router = Router();
const {
  addQuestion_Answer,
  getQuestion_Answers,
  getQuestion_AnswerById,
  updateQuestion_Answer,
  deleteQuestion_Answer,
} = require("../controllers/question_answer.controller");
router.get ("/", getQuestion_Answers);
router.get ("/:id", getQuestion_AnswerById);
router.post ("/", addQuestion_Answer);
router.put ("/:id", updateQuestion_Answer);
router.delete ("/:id", deleteQuestion_Answer);

module.exports = router;
