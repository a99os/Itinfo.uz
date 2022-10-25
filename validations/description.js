const Joi = require("joi");

exports.descriptionValidate = (data) => {
  const schema = Joi.object({
    category_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
    description: Joi.string().required().min(2).max(255).trim(),
  });

  return schema.validate(data);
};
