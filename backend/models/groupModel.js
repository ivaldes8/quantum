const mongoose = require("mongoose");

const investmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    investments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Investment",
      },
    ],
    name: {
      type: String,
      unique: true,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", investmentSchema);
