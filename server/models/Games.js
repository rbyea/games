const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    categories: [{ type: String }],
    language: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    receipts: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    developer: {
      type: String,
      required: true,
    },
    features: [{ type: Schema.Types.ObjectId, ref: "Features" }],
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    topSales: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Games", schema);
