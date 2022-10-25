const Joi = require("joi");

exports.desc_topicValidator = (data) => {
  const schema = Joi.object({
    desc_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
    topic_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
  });
  return schema.validate(data);
};
