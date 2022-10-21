const { default: mongoose } = require("mongoose");
const Author = require("../models/Author");

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
  if (await Author.findOne({ email: email }))
    return res.status(400).send({ message: "this email already exists" });
  if (await Author.findOne({ phone: phone }))
    return res.status(400).send({ message: "this phone already exists" });

  Author({
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
  })
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add author" });
    })
    .catch((error) => errorHandler(res, error));
};

const getAuthors = (req, res) => {
  Author.find()
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Author not found" });
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getAuthorById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Author.findById(req.params.id)
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Author not found" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateAuthor = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Author.findById(req.params.id)))
    return res.status(400).send({ message: "Not found Author" });

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
  if (await Author.findOne({ email: email }))
    return res.status(400).send({ message: "this email already exists" });
  if (await Author.findOne({ phone: phone }))
    return res.status(400).send({ message: "this phone already exists" });

  const auth = await Author.findById(req.params.id);

  Author.findByIdAndUpdate(req.params.id, {
    author_first_name: author_first_name || auth.author_first_name,
    author_last_name: author_last_name || auth.author_last_name,
    author_nick_name: author_nick_name || author_email,
    author_email: author_email || auth.author_email,
    author_phone: author_phone || auth.author_phone,
    author_password: author_password || auth.author_password,
    author_info: author_info || auth.author_info,
    author_position: author_position || auth.author_position,
    author_photo: author_photo || auth.author_photo,
    is_expert: is_expert || auth.is_expert,
  })
    .then(() => {
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteAuthor = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Notog'ri id" });
  if (!(await Author.findById(req.params.id)))
    return res.status(400).send({ message: "Author not found" });

  Author.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Succesfull delete" });
    })
    .catch((error) => errorHandler(res, error));
};
module.exports = {
  addAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
