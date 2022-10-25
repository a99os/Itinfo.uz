const Joi = require("joi");

exports.socialValidate = (data) => {
  const schema = Joi.object({
    social_name: Joi.string().required().max(256).trim(),
    social_icon_file: Joi.string().required().max(255).trim(),
  });

  return schema.validate(data);
};
