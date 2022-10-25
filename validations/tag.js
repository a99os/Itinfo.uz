const Joi = require("joi");

exports.tagValidator = (data) => {
  const schema = Joi.object({
    topic_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
    category_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
  });
  return schema.validate(data);
};
