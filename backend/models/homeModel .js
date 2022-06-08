const mongoose = require("mongoose");

const homeSchema = mongoose.Schema(
  {
    aboutTitle: {
      type: String,
      required: true,
    },
    aboutDescription: {
      type: String,
    },
    fraseTitle: {
      type: String,
      required: true,
    },
    fraseDescription: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    portafolio: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "HomeCard",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", homeSchema);
