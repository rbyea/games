const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    cpu: {
      type: String,
      required: true,
    },
    gpu: {
      type: String,
      required: true,
    },
    directx: {
      type: Number,
      required: true,
    },
    system: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    gameId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Specification", schema);
