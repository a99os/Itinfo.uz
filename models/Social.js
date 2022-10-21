const { Schema, model } = require("mongoose");

const socialSchema = new Schema(
  {
    social_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    social_icon_file: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { versionKey: false }
);

module.exports = model("Social", socialSchema);
