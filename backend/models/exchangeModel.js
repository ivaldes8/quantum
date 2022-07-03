const mongoose = require("mongoose");

const exchangeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a currency"],
      ref: "Currency",
    },
    change: {
      type: Number,
      required: [true, "Please add a change"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exchange", exchangeSchema);

