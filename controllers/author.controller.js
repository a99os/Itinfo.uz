const { default: mongoose } = require("mongoose");
const Author = require("../models/Dictionary");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};


const addAuthor = async (req, res) => {
  const {
    author_first_name,
    author_last_name,
    author_nick_name, 
    author_email,
    author_phone,
    author_password,
    author_info,
    author_position,
    author_photo,
    is_expert,
  } = req.body;


  const letter = term[0];
  const uniqueTerm = term.toLowerCase();

  Dictionary({ term, letter, uniqueTerm })
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add dictionry" });
    })
    .catch((error) => errorHandler(res, error));
};

const getAuthors = (req, res) => {
  Dictionary.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getAuthorsById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Dictionary.findById(req.params.id)
    .then((data) => {
      if (!data)
        return res.status(400).send({ message: "Dictionary not found" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateAuthor = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Notog'ri id" });
  const { term } = req.body,
    letter = term[0],
    uniqueTerm = term;
  Dictionary.findByIdAndUpdate(req.params.id, { term, letter, uniqueTerm })
    .then((data) => {
      if (!data)
        return res.status(400).send({ message: "Dictionary not found" });
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteAuthor = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Notog'ri id" });
  if (!(await Dictionary.findById(req.params.id)))
    return res.status(400).send({ message: "Dictionary not found" });

  Dictionary.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Succesfull delete" });
    })
    .catch((error) => errorHandler(res, error));
};
module.exports = {
  addAuthor,
  getAuthors,
  getAuthorsByLetter,
  getAuthorsById,
  updateAuthor,
  deleteAuthor,
};
