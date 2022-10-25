const { default: mongoose } = require("mongoose");
const Topic = require("../models/Topic");
const Author = require("../models/Author");

const { topicValidator } = require("../validations/topic");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addTopic = async (req, res) => {
  const { error, value } = topicValidator(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const {
    author_id,
    topic_title,
    topic_text,
    is_checked,
    is_approved,
    expert_id,
  } = value;
  if (await Topic.findOne({ topic_title: topic_title }))
    return res.status(400).send({ message: "this topic already exists" });
  if (!mongoose.isValidObjectId(author_id))
    return res.status(400).send({ message: "Invalid objectId author_id" });

  if (!(await Author.findById(author_id)))
    return res.status(400).send({ message: "Not found author_id" });

  if (!mongoose.isValidObjectId(expert_id))
    return res.status(400).send({ message: "Invalid objectId expert_id" });

  if (!(await Author.findOne({ expert_id: expert_id })))
    return res.status(400).send({ message: "Not found expert_id" });

  Topic(value)
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add Topic" });
    })
    .catch((error) => errorHandler(res, error));
};

const getTopics = (req, res) => {
  Topic.find()
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Topic not found" });
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getTopicById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Topic.findById(req.params.id)
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Topic not found" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateTopic = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Topic.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Topic" });

  const {
    author_id,
    topic_title,
    topic_text,
    is_checked,
    is_approved,
    expert_id,
  } = req.body;
  if (await Topic.findOne({ topic_title: topic_title }))
    return res.status(400).send({ message: "this topic already exists" });
  if (author_id && !mongoose.isValidObjectId(author_id))
    return res.status(400).send({ message: "Invalid objectId author_id" });

  if (!(await Author.findById(author_id)))
    return res.status(400).send({ message: "Not found author_id" });

  if (expert_id && !mongoose.isValidObjectId(expert_id))
    return res.status(400).send({ message: "Invalid objectId expert_id" });

  if (!(await Author.findOne({ expert_id: expert_id })))
    return res.status(400).send({ message: "Not found expert_id" });

  const topic = await Topic.findById(req.params.id);

  Topic.findByIdAndUpdate(req.params.id, {
    author_id: author_id || topic.author_id,
    topic_title: topic_title || topic.topic_title,
    topic_text: topic_text || topic.topic_text,
    is_checked: is_checked || topic.is_checked,
    is_approved: is_approved || topic.is_approved,
    expert_id: expert_id || topic.expert_id,
  })
    .then(() => {
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteTopic = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Topic.findById(req.params.id)))
    return res.status(400).send({ message: "Topic not found" });

  Topic.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Succesfull delete" });
    })
    .catch((error) => errorHandler(res, error));
};
module.exports = {
  addTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
};
