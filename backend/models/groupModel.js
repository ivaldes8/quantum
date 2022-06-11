const mongoose = require("mongoose");

const investmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
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
