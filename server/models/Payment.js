const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    games: [{ type: Schema.Types.ObjectId, ref: "Games" }],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Payment", schema);
