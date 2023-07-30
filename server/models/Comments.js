const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    gameId: { type: Schema.Types.ObjectId, ref: "Games" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comments", schema);
