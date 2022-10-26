const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    author_first_name: {
      type: String,
      required: true,
      trim: true,
    },
    author_last_name: {
      type: String,
      required: true,
      trim: true,
    },
    author_nick_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    author_email: {
      type: String,
      unique: [true, "Bunday email mavjud"],
      trim: true,
      required: [true, "email kiriting"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Iltimos to'g'ri email kiriting",
      ],
    },
    author_phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    author_password: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 6,
      trim: true,
    },
    author_info: {
      type: String,
      trim: true,
    },
    author_position: {
      type: String,
      trim: true,
    },
    author_photo: {
      type: String,
      trim: true,
    },
    is_expert: {
      type: Boolean,
      required: [true, "Expertmi?"],
    },
  },
  { versionKey: false }
);

module.exports = model("Author", authorSchema);
