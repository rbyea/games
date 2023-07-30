const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    images: [{ type: String, required: true }],
    gameId: { type: Schema.Types.ObjectId, ref: "Games" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("SliderCard", schema);
