const Synonim = require("../models/Synonim");
const Dictionary = require("../models/Dictionary");
const Description = require("../models/Description");
const mongoose = require("mongoose");
const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addSynonim = async (req, res) => {
  const { dict_id, desc_id } = req.body;

  if (!mongoose.isValidObjectId(dict_id))
    return res.status(400).send({ message: "Invalid objectId dict_id" });

  if (!(await Dictionary.findById(dict_id)))
    return res.status(400).send({ message: "Not found dict_id" });

  if (!mongoose.isValidObjectId(desc_id))
    return res.status(400).send({ message: "Invalid objectId desc_id" });

  if (!(await Description.findById(desc_id)))
    return res.status(400).send({ message: "Not found desc_id" });

  Synonim({ dict_id, desc_id })
    .save()
    .then(() => {
      return res.status(200).send({ message: "Succesfull add" });
    })
    .catch((err) => errorHandler(res, err));
};

const getSynonims = async (req, res) => {
  Synonim.find({})
    .populate("dict_id")
    .populate("desc_id")
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Not Synonim yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const getSynonimById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Synonim.findById(req.params.id)
    .populate("dict_id")
    .populate("desc_id")
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Not Synonim yet" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateSynonim = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });

  if (!(await Synonim.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Synonim" });

  const { dict_id, desc_id } = req.body;

  if (dict_id && !mongoose.isValidObjectId(dict_id))
    return res.status(400).send({ message: "Invalid objectId dict_id" });

  if (!(await Dictionary.findById(dict_id)))
    return res.status(400).send({ message: "Not found dict_id" });

  if (desc_id && !mongoose.isValidObjectId(desc_id))
    return res.status(400).send({ message: "Invalid objectId desc_id" });

  if (!(await Description.findById(desc_id)))
    return res.status(400).send({ message: "Not found desc_id" });

  const data = await Synonim.findById(req.params.id);
  Synonim.findByIdAndUpdate(req.params.id, {
    dict_id: dict_id || data.dict_id,
    desc_id: desc_id || data.desc_id,
  })
    .then(() => res.status(200).send({ message: "Succesful update" }))
    .catch((error) => errorHandler(res, error));
};

const deleteSynonim = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Synonim.findById(req.params.id)))
    return res.status(400).send({ message: "Not found author_social" });
  Synonim.findByIdAndDelete(req.params.id).then(() =>
    res.status(200).send({ message: "Succesful delete description" })
  );
};

module.exports = {
  addSynonim,
  getSynonims,
  getSynonimById,
  updateSynonim,
  deleteSynonim,
};
