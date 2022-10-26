const Joi = require("joi");

exports.adminValidate = (data) => {
  const schema = Joi.object({
    admin_name: Joi.string().required().trim(),
    admin_email: Joi.string().required().email(),
    admin_password: Joi.string().required().min(6).trim(),
    admin_is_active: Joi.boolean().default(false),
    admin_is_creator: Joi.boolean().default(false),
  });
  return schema.validate(data);
};
