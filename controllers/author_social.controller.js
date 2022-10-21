const Author_Social = require("../models/Author_Social");
const Author = require("../models/Author");
const Social = require("../models/Social");
const mongose = require("mongoose");
const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addAS = async (req, res) => {
  const { author_id, social_id, social_link } = req.body;

  if (!social_link) return res.status(400).send({ message: "social_link" });

  if (!mongose.isValidObjectId(author_id))
    return res.status(400).send({ message: "Invalid objectId author_id" });

  if (!(await Author.findById(author_id)))
    return res.status(400).send({ message: "Not found author_id" });

  if (!mongose.isValidObjectId(social_id))
    return res.status(400).send({ message: "Invalid objectId social_id" });

  if (!(await Social.findById(social_id)))
    return res.status(400).send({ message: "Not found social_id" });

  Author_Social({ author_id, social_id, social_link })
    .save()
    .then(() => {
      return res.status(200).send({ message: "Succesfull add" });
    })
    .catch((err) => errorHandler(res, err));
};

const getASs = async (req, res) => {
  Author_Social.find({})
    .populate("author_id")
    .populate("social_id")
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Not Author_Social yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const getASById = async (req, res) => {
  if (!mongose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Author_Social.findById(req.params.id)
    .populate("author_id")
    .populate("social_id")
    .then((data) => {
      if (!data)
        return res.status(400).send({ message: "Not Author_Social yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateAS = async (req, res) => {
  if (!mongose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });

  if (!(await Author_Social.findById(req.params.id)))
    return res.status(400).send({ message: "Not found author_social" });

  const { author_id, social_id, social_link } = req.body;

  if (!social_link) return res.status(400).send({ message: "social_link" });

  if (author_id && !mongose.isValidObjectId(author_id))
    return res.status(400).send({ message: "Invalid objectId author_id" });

  if (!(await Author.findById(author_id)))
    return res.status(400).send({ message: "Not found author_id" });

  if (social_id && !mongose.isValidObjectId(social_id))
    return res.status(400).send({ message: "Invalid objectId social_id" });

  if (!(await Social.findById(social_id)))
    return res.status(400).send({ message: "Not found social_id" });
  const data = await Author_Social.findById(req.params.id);

  Author_Social.findByIdAndUpdate(req.params.id, {
    author_id: author_id || data.author_id,
    social_id: social_id || data.social_id,
    social_link: social_link || data.social_link,
  })
    .then(() => res.status(200).send({ message: "Succesful update" }))
    .catch((error) => errorHandler(res, error));
};

const deleteAS = async (req, res) => {
  if (!mongose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Author_Social.findById(req.params.id)))
    return res.status(400).send({ message: "Not found author_social" });
  Author_Social.findByIdAndDelete(req.params.id).then(() =>
    res.status(200).send({ message: "Succesful delete description" })
  );
};

module.exports = { addAS, getASs, getASById, updateAS, deleteAS };
