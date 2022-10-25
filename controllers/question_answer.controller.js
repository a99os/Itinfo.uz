const { default: mongoose } = require("mongoose");
const Question_Answer = require("../models/Question_Answer");
const Author = require("../models/Author");
const { quest_answValidator } = require("../validations/question_answer");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addQuestion_Answer = async (req, res) => {
  const { error, value } = quest_answValidator(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { question, answer, is_checked, expert_id } = value;
  console.log(value);
  if (!mongoose.isValidObjectId(expert_id))
    return res.status(400).send({ message: "Invalid expert_id" });
  const auth = await Author.findById(expert_id);
  if (!auth) return res.status(400).send({ message: "not found author" });
  if (auth.is_expert == false)
    return res.status(400).send({ message: "Not expert this author" });

  Question_Answer({
    question,
    answer,
    is_checked,
    expert_id,
  })
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add" });
    })
    .catch((error) => errorHandler(res, error));
};

const getQuestion_Answers = (req, res) => {
  Question_Answer.find()
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Question_Answer not found" });
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getQuestion_AnswerById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Question_Answer.findById(req.params.id)
    .then((data) => {
      if (!data)
        return res.status(400).send({ message: "Question_Answer not found" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateQuestion_Answer = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Question_Answer.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Question_Answer" });

  const { question, answer, is_checked, expert_id } = req.body;

  if (!mongoose.isValidObjectId(expert_id))
    return res.status(400).send({ message: "Invalid expert_id" });
  if ((await Question_Answer.findById(expert_id)).is_expert !== false)
    return res.status(400).send({ message: "Not found expert author" });

  const data = await Question_Answer.findById(req.params.id);

  Question_Answer.findByIdAndUpdate(req.params.id, {
    question: question || data.question,
    answer: answer || data.answer,
    is_checked: is_checked || data.is_checked,
    expert_id: expert_id || data.expert_id,
  })
    .then(() => {
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteQuestion_Answer = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Notog'ri id" });
  if (!(await Question_Answer.findById(req.params.id)))
    return res.status(400).send({ message: "Question_Answer not found" });

  Question_Answer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ message: "Succesfull delete" });
    })
    .catch((error) => errorHandler(res, error));
};
module.exports = {
  addQuestion_Answer,
  getQuestion_Answers,
  getQuestion_AnswerById,
  updateQuestion_Answer,
  deleteQuestion_Answer,
};
