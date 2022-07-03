const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    role: {
        type: String,
        required: [true, "Please add a role"]
    },
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Currency",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema)
