const Desc_QA = require("../models/Desc_QA");
const Question_Answer = require("../models/Question_Answer");
const Description = require("../models/Description");
const mongoose = require("mongoose");
const { desc_qaValidator } = require("../validations/desc_qa");
const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addDesc_QA = async (req, res) => {
  const { error } = desc_qaValidator(req.body);
  if (error) return res.status(500).send({ message: error.details[0].message });

  const { QA_id, desc_id } = req.body;

  if (!mongoose.isValidObjectId(QA_id))
    return res.status(400).send({ message: "Invalid objectId QA_id" });

  if (!(await Question_Answer.findById(QA_id)))
    return res.status(400).send({ message: "Not found QA_id" });

  if (!mongoose.isValidObjectId(desc_id))
    return res.status(400).send({ message: "Invalid objectId desc_id" });

  if (!(await Description.findById(desc_id)))
    return res.status(400).send({ message: "Not found desc_id" });

  Desc_QA({ QA_id, desc_id })
    .save()
    .then(() => {
      return res.status(200).send({ message: "Succesfull add" });
    })
    .catch((err) => errorHandler(res, err));
};

const getDesc_QAs = async (req, res) => {
  Desc_QA.find({})
    .populate("QA_id")
    .populate("desc_id")
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Not Desc_QA yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const getDesc_QAById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Desc_QA.findById(req.params.id)
    .populate("QA_id")
    .populate("desc_id")
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Not Desc_QA yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateDesc_QA = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });

  if (!(await Desc_QA.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Desc_QA" });

  const { QA_id, desc_id } = req.body;

  if (QA_id && !mongoose.isValidObjectId(QA_id))
    return res.status(400).send({ message: "Invalid objectId QA_id" });

  if (!(await Question_Answer.findById(QA_id)))
    return res.status(400).send({ message: "Not found QA_id" });

  if (desc_id && !mongoose.isValidObjectId(desc_id))
    return res.status(400).send({ message: "Invalid objectId desc_id" });

  if (!(await Description.findById(desc_id)))
    return res.status(400).send({ message: "Not found desc_id" });

  const data = await Desc_QA.findById(req.params.id);
  Desc_QA.findByIdAndUpdate(req.params.id, {
    QA_id: QA_id || data.QA_id,
    desc_id: desc_id || data.desc_id,
  })
    .then(() => res.status(200).send({ message: "Succesful update" }))
    .catch((error) => errorHandler(res, error));
};

const deleteDesc_QA = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Desc_QA.findById(req.params.id)))
    return res.status(400).send({ message: "Not found author_social" });
  Desc_QA.findByIdAndDelete(req.params.id).then(() =>
    res.status(200).send({ message: "Succesful delete description" })
  );
};

module.exports = {
  addDesc_QA,
  getDesc_QAs,
  getDesc_QAById,
  updateDesc_QA,
  deleteDesc_QA,
};
