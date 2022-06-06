const mongoose = require("mongoose");
const validator = require("validator");

const orderAssignmentSchema = new mongoose.Schema(
  {
    order: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    vendor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
      },
    ],
    orderQuantityAssigned: Number,

    dateAssigned: {
      type: Date,
      default: Date.now,
    },
    assignedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    assignmentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "notAccepted"],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderAssignment = mongoose.model(
  "OrderAssignment",
  orderAssignmentSchema
);

module.exports = OrderAssignment;
