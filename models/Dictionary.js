const { Schema, model } = require("mongoose");

const dictSchema = new Schema(
  {
    term: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    letter: {
      type: String,
      uppercase: true,
    },
    uniqueTerm: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  { versionKey: false }
);

module.exports = model("Dictionary", dictSchema);
