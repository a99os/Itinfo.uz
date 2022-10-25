const { default: mongoose } = require("mongoose");
const Social = require("../models/Social");
const { socialValidate } = require("../validations/social");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addSocial = async (req, res) => {
  const { social_name, social_icon_file } = req.body;

  const { error, value } = socialValidate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  if (await Social.findOne({ social_name }))
    return res.status(400).send({ message: "this social already exists" });
  if (!social_name || !social_icon_file)
    return res.status(400).send({ message: "enter the details completely" });

  Social({
    social_name,
    social_icon_file,
  })
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add social" });
    })
    .catch((error) => errorHandler(res, error));
};

const getSocials = (req, res) => {
  Social.find()
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Social not found" });

      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getSocialById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Social.findById(req.params.id)
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Social not found" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateSocial = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Social.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Social" });

  const { social_name, social_icon_file } = req.body;
  if (await Social.findOne({ social_name }))
    return res.status(400).send({ message: "this social already exists" });
  if (!social_name || !social_icon_file)
    return res.status(400).send({ message: "enter the details completely" });

  const social = await Social.findById(req.params.id);

  Social.findByIdAndUpdate(req.params.id, {
    social_name: social_name || social.social_name,
    social_icon_file: social_icon_file || social.social_icon_file,
  })
    .then(() => {
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteSocial = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Social.findById(req.params.id)))
    return res.status(400).send({ message: "Social not found" });

  Social.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Succesfull delete" });
    })
    .catch((error) => errorHandler(res, error));
};
module.exports = {
  addSocial,
  getSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
};
