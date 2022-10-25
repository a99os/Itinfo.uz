const Joi = require("joi");

exports.quest_answValidator = (data) => {
  const schema = Joi.object({
    question: Joi.string().required().trim().max(255),
    answer: Joi.string().required().trim().max(255),
    is_checked: Joi.boolean().default(false),
    expert_id: Joi.string()
      .required()
      .length(24)
      .pattern(new RegExp("^[a-f0-9]{2,24}$")),
  });
  return schema.validate(data);
};
