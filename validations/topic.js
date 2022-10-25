const Joi = require("joi");

exports.topicValidator = (data) => {
  const schema = Joi.object({
    author_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
    topic_title: Joi.string().required().trim().max(255),
    topic_text: Joi.string().required().trim().max(255),
    id_cheked: Joi.boolean().default(false),
    id_approved: Joi.boolean().default(false),
    expert_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
  });
  return schema.validate(data);
};
