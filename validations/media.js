const Joi = require("joi");

exports.mediaValidator = (data) => {
  const schema = Joi.object({
    media_name: Joi.string().required().trim().max(255),
    media_file: Joi.string().required().trim().max(255),
    target_table_name: Joi.string().required().trim().max(255),
    target_table_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
  });
  return schema.validate(data);
};
