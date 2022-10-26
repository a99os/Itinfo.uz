const Joi = require("joi");

const generateNickname = (parent, helpers) => {
  return (
    parent.admin_first_name.toLowerCase() +
    "-" +
    parent.admin_last_name.toLowerCase()
  );
};

exports.adminValidator = (data) => {
  const schema = Joi.object({
    admin_first_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]{1,50}$"))
      .required(),
    admin_last_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]{1,50}$"))
      .required(),
    admin_nick_name: Joi.string().max(30).default(generateNickname),
    admin_email: Joi.string().email(),
    admin_phone: Joi.string()
      .pattern(/\d{2}-\d{3}-\d{2}-\d{2}/)
      .length(12),
    admin_password: Joi.string().min(6).max(30),
    confirm_password: Joi.ref("admin_password"),
    admin_info: Joi.string(),
    admin_position: Joi.string(),
    admin_photo: Joi.string().default("admin/photo/png"),
    is_expert: Joi.boolean().default(false),
  });
  return schema.validate(data);
};
