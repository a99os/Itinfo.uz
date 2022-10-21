const { Schema, model } = require("mongoose");
const descQASchema = new Schema({
  desc_id: {
    type: Schema.Types.ObjectId,
    ref: "Description",
    required: true,
  },
  QA_id: {
    type: Schema.Types.ObjectId,
    ref: "Question_Answer",
    required: true,
  },
});

module.exports = model("Desc_QA", descQASchema);
