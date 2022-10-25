const Joi = require("joi");

exports.dictionaryValidator = (data) => {
  const schema = Joi.object({
    term: Joi.string().min(2).max(50).required(),
  });
  return schema.validate(data);
};
