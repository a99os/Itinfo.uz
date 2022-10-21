const { Schema, model } = require("mongoose");

const topicSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectID,
      ref: "Author",
      required: true,
    },
    topic_title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    topic_text: {
      type: String,
      required: true,
      trim: true,
    },
    id_cheked: {
      type: Boolean,
      required: true,
    },
    id_approved: {
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

module.exports = model("Topic", topicSchema);
