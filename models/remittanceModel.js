const mongoose = require("mongoose");
const validator = require("validator");

const remittanceSchema = new mongoose.Schema(
  {
    order: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    payment: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Payment",
      },
    ],
    vendor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
      },
    ],
    customer: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Customer",
      },
    ],
    prevailingBaseCurrency: String,
    generalRemittanceStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "partial", "complete"],
    },
    paymentPhase: [
      {
        type: String,
        default: "initailPayment",
        enum: ["initialPayment", "secondPayment", "thirdPayment"],
      },
    ],

    remittance: {
      agreedRemittanceCurrency: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Currency",
        },
      ],
      agreedRemittanceBaseExchangeRate: Number,
      paymentRemittanceDate: Date,
      totalAmountExpectedForRemittance: Number,
      actualAmountRemitted: Number,
      remittanceStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "partial", "complete"],
      },
    },

    retention: {
      agreedRetentionCurrency: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Currency",
        },
      ],
      agreedRetentionBaseExchangeRate: Number,
      paymentRetentionDate: Date,
      totalAmountExpectedForRetention: Number,
      amountRetained: Number,
      retentionStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "partial", "complete"],
      },
    },
    postedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    datePosted: {
      type: Date,
      default: Date.now,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Remittance = mongoose.model("Remittance", remittanceSchema);

module.exports = Remittance;
