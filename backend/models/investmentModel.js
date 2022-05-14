const mongoose = require("mongoose");

const investmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
    },
    refs: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investment", investmentSchema);
