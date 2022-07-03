const mongoose = require("mongoose");

const currencySchema = mongoose.Schema(
  {
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
