const { default: mongoose } = require("mongoose");
const Dictionary = require("../models/Dictionary");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addTerm = async (req, res) => {
  const { term } = req.body;
  if (!term && Object.keys(req.body).length == 1)
    return res.status(400).send({ message: "Term kiritishingiz kerak" });

  if (await Dictionary.findOne({ uniqueTerm: term.toLowerCase() }))
    return res.status(400).send({ message: "Bunday term bor" });

  const letter = term[0];
  const uniqueTerm = term.toLowerCase();

  Dictionary({ term, letter, uniqueTerm })
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add dictionry" });
    })
    .catch((error) => errorHandler(res, error));
};

const getTerms = (req, res) => {
  Dictionary.find()
    .then((data) => {
      if (!data.length) return res.status(400).send({ message: "not data" });
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getTermsByLetter = (req, res) => {
  const letter = req.params.letter.toUpperCase();
  Dictionary.find({ letter: letter })
    .then((data) => {
      if (!data.length) return res.status(400).send({ message: "not data" });
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getTermById = (req, res) => {
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

const updateTerm = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Notog'ri id" });
  if (!(await Dictionary.findById(req.params.id)))
    return res.status(400).send({ message: "Dictionary not found" });
  const { term } = req.body,
    letter = term[0],
    uniqueTerm = term;
  Dictionary.findByIdAndUpdate(req.params.id, { term, letter, uniqueTerm })
    .then((data) => {
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteTerm = async (req, res) => {
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
  addTerm,
  getTerms,
  getTermsByLetter,
  getTermById,
  updateTerm,
  deleteTerm,
};
