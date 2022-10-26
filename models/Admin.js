const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    admin_name: {
      type: String,
      required: true,
      trim: true,
    },

    admin_email: {
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

    admin_password: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 6,
      trim: true,
    },
    admin_is_active: {
      type: Boolean,
      default: false,
    },
    admin_is_creator: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Admin", adminSchema);
