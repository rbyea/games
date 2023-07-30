const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    gameId: { type: Schema.Types.ObjectId, ref: "Games" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Basket", schema);
