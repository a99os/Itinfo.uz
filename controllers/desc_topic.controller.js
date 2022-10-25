const Desc_Topic = require("../models/Desc_Topic");
const Topic = require("../models/Topic");
const Description = require("../models/Description");
const mongoose = require("mongoose");
const { desc_topicValidator } = require("../validations/desc_topic");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addDesc_Topic = async (req, res) => {
  const { error } = desc_topicValidator(req.body);
  if (error) return res.status(500).send({ message: error.details[0].message });

  const { topic_id, desc_id } = req.body;

  if (!mongoose.isValidObjectId(topic_id))
    return res.status(400).send({ message: "Invalid objectId topic_id" });

  if (!(await Topic.findById(topic_id)))
    return res.status(400).send({ message: "Not found topic_id" });

  if (!mongoose.isValidObjectId(desc_id))
    return res.status(400).send({ message: "Invalid objectId desc_id" });

  if (!(await Description.findById(desc_id)))
    return res.status(400).send({ message: "Not found desc_id" });

  Desc_Topic({ topic_id, desc_id })
    .save()
    .then(() => {
      return res.status(200).send({ message: "Succesfull add" });
    })
    .catch((err) => errorHandler(res, err));
};

const getDesc_Topics = async (req, res) => {
  Desc_Topic.find({})
    .populate("topic_id")
    .populate("desc_id")
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Not Desc_Topic yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const getDesc_TopicById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Desc_Topic.findById(req.params.id)
    .populate("topic_id")
    .populate("desc_id")
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Not Desc_Topic yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateDesc_Topic = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });

  if (!(await Desc_Topic.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Desc_Topic" });

  const { topic_id, desc_id } = req.body;

  if (topic_id && !mongoose.isValidObjectId(topic_id))
    return res.status(400).send({ message: "Invalid objectId topic_id" });

  if (!(await Topic.findById(topic_id)))
    return res.status(400).send({ message: "Not found topic_id" });

  if (desc_id && !mongoose.isValidObjectId(desc_id))
    return res.status(400).send({ message: "Invalid objectId desc_id" });

  if (!(await Description.findById(desc_id)))
    return res.status(400).send({ message: "Not found desc_id" });

  const data = await Desc_Topic.findById(req.params.id);
  Desc_Topic.findByIdAndUpdate(req.params.id, {
    topic_id: topic_id || data.topic_id,
    desc_id: desc_id || data.desc_id,
  })
    .then(() => res.status(200).send({ message: "Succesful update" }))
    .catch((error) => errorHandler(res, error));
};

const deleteDesc_Topic = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Desc_Topic.findById(req.params.id)))
    return res.status(400).send({ message: "Not found author_social" });
  Desc_Topic.findByIdAndDelete(req.params.id).then(() =>
    res.status(200).send({ message: "Succesful delete description" })
  );
};

module.exports = {
  addDesc_Topic,
  getDesc_Topics,
  getDesc_TopicById,
  updateDesc_Topic,
  deleteDesc_Topic,
};
