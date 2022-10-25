const { default: mongoose } = require("mongoose");
const Dictionary = require("../models/Dictionary");
const { dictionaryValidator } = require("../validations/dictionary");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addTerm = async (req, res) => {
  const { error, value } = dictionaryValidator(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const { term } = value;
  if (
    await Dictionary.findOne({
      term: { $regex: term, $options: "i" },
    })
  )
    return res.status(400).send({ message: "This category been already" });

  const letter = term[0];

  Dictionary({ term, letter })
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
  const { error, value } = dictionaryValidator(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  const { term } = value,
    letter = term[0];

  const dict = await Dictionary.findOne({
    term: { $regex: term, $options: "i" },
  });
  if (dict && dict._id != req.params.id)
    return res.status(400).send({ message: "This category been already" });

  Dictionary.findByIdAndUpdate(req.params.id, { term, letter })
    .then(() => {
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
