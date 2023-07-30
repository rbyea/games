const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    gameId: { type: Schema.Types.ObjectId, ref: "Games" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Favorite", schema);
