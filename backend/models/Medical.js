const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const medicalSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animals",
      require: true,
    },

    sinfo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Medical = mongoose.model("Medical_Document", medicalSchema);
module.exports = Medical;
