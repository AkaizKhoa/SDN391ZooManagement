const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    CustomerName: {
      type: String,
      required: true,
    },

    CustomerEmail: {
      type: String,
      required: true,
    },

    MobileNumber: {
      type: String,
      required: true,
    },

    Date: {
      type: String,
      required: true,
    },
    Time: {
      type: String,
      required: true,
    },

    Prices: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "price",
      require: true,
    },
    Quantity: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tour Bookings", bookingSchema);
