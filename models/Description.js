const { Schema, model } = require("mongoose");

const descSchema = new Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

module.exports = model("Description", descSchema);
