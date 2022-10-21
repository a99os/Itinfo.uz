const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    parent_category_id: {
      type: Schema.Types.ObjectID,
      ref: "Category",
    },
  },
  { versionKey: false }
);

module.exports = model("Category", categorySchema);
