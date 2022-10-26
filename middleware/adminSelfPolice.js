const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(403).send({ message: "Admin ro'yhatdan o'tmagan 1" });
    const token = authorization.split(" ")[1];
    if (!token)
      return res.status(403).send({ message: "Admin ro'yhatdan o'tmagan 2" });
    const { admin_is_creator, id } = jwt.verify(token, config.get("secret"));
    if (!admin_is_creator || req.params.id != id)
      return res
        .status(403)
        .json({ message: "siz creator admin yoki bu id egasi emassiz" });

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Admin ro'yhatdan o'tmagan 3" });
  }
};
