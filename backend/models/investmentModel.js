const mongoose = require("mongoose");

const investmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Group",
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
    },
    actions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Action",
      },
    ],
    refs: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investment", investmentSchema);
