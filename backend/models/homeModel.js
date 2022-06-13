const mongoose = require("mongoose");

const homeSchema = mongoose.Schema(
  {
    aboutTitle: {
      type: String,
      required: [true, "Please add a about name"],
    },
    aboutDescription: {
      type: String,
    },
    fraseTitle: {
      type: String,
      required: [true, "Please add a frase title"],
    },
    fraseDescription: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    portafolio: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add at lease one card"],
        ref: "HomeCard",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", homeSchema);
