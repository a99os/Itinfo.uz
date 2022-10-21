const { Schema, model } = require("mongoose");
const questionAnswerSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    id_cheked: {
      type: Boolean,
      required: true,
    },
    expert_id: {
      type: Schema.Types.ObjectID,
      ref: "Author",
    },
  },
  { versionKey: false, timestamps: true }
);
module.exports = model("Question_Answer", questionAnswerSchema);
