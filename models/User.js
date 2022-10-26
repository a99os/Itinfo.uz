const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },

    user_email: {
      type: String,
      lowercase: true,
      unique: [true, "Bunday email mavjud"],
      trim: true,
      required: [true, "email kiriting"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Iltimos to'g'ri email kiriting",
      ],
    },

    user_password: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 6,
      trim: true,
    },
    user_info: {
      type: String,
      trim: true,
    },
    user_photo: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("User", userSchema);
