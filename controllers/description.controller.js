const Description = require("../models/Description");
const Category = require("../models/Category");
const mongose = require("mongoose");
const { descriptionValidate } = require("../validations/description");
const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addDesc = async (req, res) => {
  const { category_id, description } = req.body;
  const { error, value } = descriptionValidate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  if (category_id && !mongose.isValidObjectId(category_id))
    return res.status(400).send({ message: "Invalid objectId category_id" });

  if (!(await Category.findById(category_id)))
    return res.status(400).send({ message: "Not found category_id" });

  Description({ category_id, description })
    .save()
    .then(() => {
      return res.status(200).send({ message: "Succesfull add description" });
    })
    .catch((err) => errorHandler(res, err));
};

const getDescs = async (req, res) => {
  Description.find({})
    .populate("category_id")
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Not Description yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const getDescById = async (req, res) => {
  if (!mongose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Description.findById(req.params.id)
    .populate("category_id")
    .then((data) => {
      if (!data)
        return res.status(400).send({ message: "Not found description" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateDesc = async (req, res) => {
  if (!mongose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Description.findById(category_id)))
    return res.status(400).send({ message: "Not found description" });

  const { category_id, description } = req.body;
  if (!description)
    return res.status(400).send({ message: "Invalid description" });

  if (!category_id && !mongose.isValidObjectId(category_id))
    return res.status(400).send({ message: "Invalid objectId category_id" });

  if (!(await Category.findById(category_id)))
    return res.status(400).send({ message: "Not found category_id" });
  const desc = await Description.findById(req.params.id);

  Description.findByIdAndUpdate(req.params.id, {
    category_id: category_id || desc.category_id,
    description: description || desc.description,
  })
    .then(() =>
      res.status(200).send({ message: "Succesful update description" })
    )
    .catch((error) => errorHandler(res, error));
};

const deleteDesc = async (req, res) => {
  if (!mongose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Description.findById(req.params.id)))
    return res.status(400).send({ message: "Not found description" });
  Description.findByIdAndDelete(req.params.id).then(() =>
    res.status(200).send({ message: "Succesful delete description" })
  );
};

module.exports = { addDesc, getDescs, getDescById, updateDesc, deleteDesc };
