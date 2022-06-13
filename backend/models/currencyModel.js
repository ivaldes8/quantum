const mongoose = require("mongoose");

const currencySchema = mongoose.Schema(
  {
    investments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Investment",
      },
    ],
    name: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Currency", currencySchema);
