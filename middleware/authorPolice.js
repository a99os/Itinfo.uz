const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(403).send({ message: "Avtor ro'yhatdan o'tmagan 1" });
    const token = authorization.split(" ")[1];
    if (!token)
      return res.status(403).send({ message: "Avtor ro'yhatdan o'tmagan 2" });
    const decodeData = jwt.verify(token, config.get("secret"));
    req.author = decodeData;
    console.log(decodeData);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Avtor ro'yhatdan o'tmagan 3" });
  }
};
