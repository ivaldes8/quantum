const mongoose = require("mongoose");

const actionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a investment"],
      ref: "Investment",
    },
    amount: {
      type: Number,
    },
    feedback: {
      type: Number,
    },
    date: {
      type: Date,
      required: [true, "Please add a date"]
    },
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Action", actionSchema);
