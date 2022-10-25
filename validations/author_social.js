const Joi = require("joi");

exports.auth_socValidator = (data) => {
  const schema = Joi.object({
    author_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
    social_link: Joi.string().required().trim().max(255),
    social_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
  });
  return schema.validate(data);
};
