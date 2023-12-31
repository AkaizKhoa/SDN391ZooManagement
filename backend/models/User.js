const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isTrainer: {
      type: Boolean,
      default: false,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    isUser: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
