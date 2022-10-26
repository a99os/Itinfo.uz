const Joi = require("joi");

exports.userValidate = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().required().trim(),
    user_email: Joi.string().required().email(),
    user_password: Joi.string().required().min(6).trim(),
    user_info: Joi.string(),
    user_photo: Joi.string().default("user/default.png"),
  });
  return schema.validate(data);
};
