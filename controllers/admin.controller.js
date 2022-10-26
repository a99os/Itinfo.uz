const { default: mongoose } = require("mongoose");
const Admin = require("../models/Admin");
const { adminValidate } = require("../validations/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const errorHandler = (res, error) => {
  res.status(500).send({ message: "Xatolik bor: " + error });
};

const generationAccesToken = (id, admin_is_active, admin_is_creator) =>
  jwt.sign({ id, admin_is_active, admin_is_creator }, config.get("secret"), {
    expiresIn: "8h",
  });

const addAdmin = async (req, res) => {
  const { error, value } = adminValidate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  console.log(value);
  if (await Admin.findOne({ admin_email: value.admin_email }))
    return res.status(400).send({ message: "this email already exists" });

  const adminHashedPassword = bcrypt.hashSync(value.admin_password, 7);
  value.admin_password = adminHashedPassword;
  Admin(value)
    .save()
    .then(() => {
      res.status(200).send({ message: "succesful add admin" });
    })
    .catch((error) => errorHandler(res, error));
};

const getAdmins = (req, res) => {
  Admin.find()
    .then((data) => {
      if (!data.length)
        return res.status(400).send({ message: "Admin not found" });
      res.status(200).send(data);
    })
    .catch((err) => errorHandler(res, err));
};

const getAdminById = (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  Admin.findById(req.params.id)
    .then((data) => {
      if (!data) return res.status(400).send({ message: "Admin not found" });
      res.status(200).send(data);
    })
    .catch((error) => errorHandler(res, error));
};

const updateAdmin = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Invalid id" });
  if (!(await Admin.findById(req.params.id)))
    return res.status(400).send({ message: "Admin not found" });

  const { error, value } = adminValidate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  console.log(value);

  const admin = await Admin.findOne({ admin_email: value.admin_email });

  if (admin && admin._id != req.params.id)
    return res.status(400).send({ message: "this email already exists" });

  Admin.findByIdAndUpdate(req.params.id, value)
    .then(() => {
      res.status(200).send({ message: "Succesfull update" });
    })
    .catch((error) => errorHandler(res, error));
};

const deleteAdmin = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send({ message: "Notog'ri id" });
  if (!(await Admin.findById(req.params.id)))
    return res.status(400).send({ message: "Admin not found" });

  Admin.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Succesfull delete" });
    })
    .catch((error) => errorHandler(res, error));
};

const loginAdmin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;

    const admin = await Admin.findOne({ admin_email });

    if (!admin)
      return res.status(400).send({ message: "email yoki parol noto'g'ri" });
    const validPassword = bcrypt.compareSync(
      admin_password,
      admin.admin_password
    );
    console.log(admin);
    if (!validPassword)
      return res.status(400).send({ message: "email yoki parol noto'g'ri" });
    const token = generationAccesToken(
      admin._id,
      admin.admin_is_active,
      admin.admin_is_creator
    );
    res.status(200).json(token);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  addAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
