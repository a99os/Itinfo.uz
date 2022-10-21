const { default: mongoose } = require("mongoose");
const Media = require("../models/Media");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addMedia = async (req, res) => {
  const { media_name, media_file, target_table_name, target_table_id } =
    req.body;
  if (!mongoose.isValidObjectId(target_table_id))
    return res
      .status(400)
      .send({ message: "Invalid objectId target_table_id" });

  Media({
    media_name,
    media_file,
    target_table_name,
    target_table_id,
  })
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add Media" });
    })
    .catch((error) => errorHandler(res, error));
};

const getMedias = (req, res) => {
  Media.find()
    .then((data) => {
      if (!data.length) return res.status(400).send({ message: "Media not found" });
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getMediaById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Media.findById(req.params.id)
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Media not found" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateMedia = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Media.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Media" });

  const { media_name, media_file, target_table_name, target_table_id } =
    req.body;
  if (!mongoose.isValidObjectId(target_table_id))
    return res
      .status(400)
      .send({ message: "Invalid objectId target_table_id" });

  const media = await Media.findById(req.params.id);

  Media.findByIdAndUpdate(req.params.id, {
    media_name: media_name || media.media_name,
    media_file: media_file || media.media_file,
    target_table_name: target_table_name || media.target_table_name,
  })
    .then(() => {
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteMedia = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Media.findById(req.params.id)))
    return res.status(400).send({ message: "Media not found" });

  Media.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Succesfull delete" });
    })
    .catch((error) => errorHandler(res, error));
};
module.exports = {
  addMedia,
  getMedias,
  getMediaById,
  updateMedia,
  deleteMedia,
};
