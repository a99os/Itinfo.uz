const Tag = require("../models/Tag");
const Topic = require("../models/Topic");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const { tagValidator } = require("../validations/tag");
const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addTag = async (req, res) => {
  const { error } = tagValidator(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const { topic_id, category_id } = req.body;

  if (!mongoose.isValidObjectId(topic_id))
    return res.status(400).send({ message: "Invalid objectId topic_id" });

  if (!(await Topic.findById(topic_id)))
    return res.status(400).send({ message: "Not found topic_id" });

  if (!mongoose.isValidObjectId(category_id))
    return res.status(400).send({ message: "Invalid objectId category_id" });

  if (!(await Category.findById(category_id)))
    return res.status(400).send({ message: "Not found category_id" });

  Tag({ topic_id, category_id })
    .save()
    .then(() => {
      return res.status(200).send({ message: "Succesfull add" });
    })
    .catch((err) => errorHandler(res, err));
};

const getTags = async (req, res) => {
  Tag.find({})
    .populate("topic_id")
    .populate("category_id")
    .then((data) => {
      if (!data.length) return res.status(400).send({ message: "Not Tag yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const getTagById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Tag.findById(req.params.id)
    .populate("topic_id")
    .populate("category_id")
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Not Tag yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateTag = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });

  if (!(await Tag.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Tag" });

  const { topic_id, category_id } = req.body;

  if (topic_id && !mongoose.isValidObjectId(topic_id))
    return res.status(400).send({ message: "Invalid objectId topic_id" });

  if (!(await Topic.findById(topic_id)))
    return res.status(400).send({ message: "Not found topic_id" });

  if (category_id && !mongoose.isValidObjectId(category_id))
    return res.status(400).send({ message: "Invalid objectId category_id" });

  if (!(await Category.findById(category_id)))
    return res.status(400).send({ message: "Not found category_id" });

  const data = await Tag.findById(req.params.id);
  Tag.findByIdAndUpdate(req.params.id, {
    topic_id: topic_id || data.topic_id,
    category_id: category_id || data.category_id,
  })
    .then(() => res.status(200).send({ message: "Succesful update" }))
    .catch((error) => errorHandler(res, error));
};

const deleteTag = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Tag.findById(req.params.id)))
    return res.status(400).send({ message: "Not found author_social" });
  Tag.findByIdAndDelete(req.params.id).then(() =>
    res.status(200).send({ message: "Succesful delete description" })
  );
};

module.exports = { addTag, getTags, getTagById, updateTag, deleteTag };
