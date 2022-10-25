const Category = require("../models/Category");
const { categoryValidation } = require("../validations/category");
const mongoose = require("mongoose");
const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addCategory = async (req, res) => {
  const { error } = categoryValidation(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send({ message: error.details[0].message });
  }

  const { category_name } = req.body;
  const { parent_category_id } = req.body || null;
  if (
    await Category.findOne({
      category_name: { $regex: category_name, $options: "i" },
    })
  )
    return res.status(400).send({ message: "This category been already" });

  if (parent_category_id && !mongoose.isValidObjectId(parent_category_id))
    return res.status(400).send({ message: "Invalid parent id" });
  if (parent_category_id && !(await Category.findById(parent_category_id)))
    return res.status(400).send({ message: "Parent Category not found" });
  Category({ category_name, parent_category_id })
    .save()
    .then(() => res.status(200).send({ message: "Succesful added category" }))
    .catch((error) => errorHandler(res, error));
};

const getCategories = (req, res) => {
  Category.find()
    .populate("parent_category_id", "category_name -_id")
    .then((data) => {
      if (!data.length) return res.status(400).send({ message: "not data" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const getCategoryById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Category.findById(req.params.id)))
    return res.status(400).send({ message: "Category not found" });
  Category.findById(req.params.id)
    .populate({ path: "parent_category_id" })
    .then((data) => res.status(200).send(data))
    .catch((error) => errorHandler(res, error));
};

const updateCategory = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Category.findById(req.params.id)))
    return res.status(400).send({ message: "Category not found" });

  const ctg = await Category.findOne({
    category_name: { $regex: req.body.category_name, $options: "i" },
  });
  if (ctg && ctg._id != req.params.id)
    return res.status(400).send({ message: "This category been already" });

  const { category_name } = req.body || ctg.category_name;
  const { parent_category_id } = req.body || category_name.parent_category_id;

  if (parent_category_id && !mongoose.isValidObjectId(parent_category_id))
    return res.status(400).send({ message: "Invalid parents id" });

  if (parent_category_id && !(await Category.findById(parent_category_id)))
    return res.status(400).send({ message: "Parent Category not found" });

  Category.findByIdAndUpdate(req.params.id, {
    category_name,
    parent_category_id,
  })
    .then(() => res.status(200).send({ message: "Succesfull update category" }))
    .catch((error) => errorHandler(res, error));
};

const deleteCategory = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Category.findById(req.params.id)))
    return res.status(400).send({ message: "Category not found" });
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send({ message: "Succesfull delete category" }))
    .catch((error) => errorHandler(res, error));
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
