const Joi = require("joi");

exports.emailValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
  });
  return schema.validate(data);
};
exports.phoneValidator = (data) => {
  const schema = Joi.object({
    phone: Joi.string()
      .pattern(/\d{2}-\d{3}-\d{2}-\d{2}/)
      .length(12),
  });
  return schema.validate(data);
};
