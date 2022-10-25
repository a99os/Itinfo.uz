const { default: mongoose } = require("mongoose");
const Author = require("../models/Author");
const { authorValidator } = require("../validations/author");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addAuthor = async (req, res) => {
  const { error, value } = authorValidator(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  console.log(value);
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
  } = value;
  if (await Author.findOne({ author_email: author_email }))
    return res.status(400).send({ message: "this email already exists" });
  if (await Author.findOne({ author_phone: author_phone }))
    return res.status(400).send({ message: "this phone already exists" });
  if (await Author.findOne({ author_nick_name: author_nick_name }))
    return res
      .status(400)
      .send({ message: "this author_nick_name already exists" });

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

  const data = await Author.findById(req.params.id);

  if (!data) return res.status(400).send({ message: "Not found Author" });

  Object.keys(req.body).forEach((key) => {
    data[key] = req.body[key];
  });

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
  } = data;
  const { error, value } = authorValidator({
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
  });
  console.log(value);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const auth1 = await Author.findOne({ author_email: value.author_email });
  if (auth1 && auth1._id != req.params.id)
    return res.status(400).send({ message: "this email already exists" });
  const auth2 = await Author.findOne({ author_phone: value.author_phone });
  if (auth2 && auth2._id != req.params.id)
    return res.status(400).send({ message: "this phone already exists" });

  console.log(value);
  Author.findByIdAndUpdate(req.params.id, value)
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
