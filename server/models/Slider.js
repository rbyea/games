const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
    description: {
      type: String,
      required: true,
    },
    gameId: { type: Schema.Types.ObjectId, ref: "Games" },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Slider", schema);
