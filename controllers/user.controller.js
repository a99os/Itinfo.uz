const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const { userValidate } = require("../validations/User");
const bcrypt = require("bcrypt");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const addUser = async (req, res) => {
  const { error, value } = userValidate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  console.log(value);
  if (await User.findOne({ user_email: value.user_email }))
    return res.status(400).send({ message: "this email already exists" });

  const userHashedPassword = bcrypt.hashSync(value.user_password, 7);
  value.user_password = userHashedPassword;
  User(value)
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add user" });
    })
    .catch((error) => errorHandler(res, error));
};

const getUsers = (req, res) => {
  User.find()
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "User not found" });
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getUserById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  User.findById(req.params.id)
    .then((data) => {
      if (!data) return res.status(400).send({ message: "User not found" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await User.findById(req.params.id)))
    return res.status(400).send({ message: "User not found" });

  const { error, value } = userValidate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  console.log(value);

  const user = await User.findOne({ user_email: value.user_email });

  if (user && user._id != req.params.id)
    return res.status(400).send({ message: "this email already exists" });

  User.findByIdAndUpdate(req.params.id, value)
    .then(() => {
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Notog'ri id" });
  if (!(await User.findById(req.params.id)))
    return res.status(400).send({ message: "User not found" });

  User.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Succesfull delete" });
    })
    .catch((error) => errorHandler(res, error));
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await User.findOne({ user_email });

    if (!user)
      return res.status(400).send({ message: "email yoki parol noto'g'ri" });
    const validPassword = bcrypt.compareSync(
      user_password,
      user.user_password
    );
    if (!validPassword)
      return res.status(400).send({ message: "email yoki parol noto'g'ri" });
    res.status(400).send("Saytga hush kelibsiz");
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
