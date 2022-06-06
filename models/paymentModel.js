const mongoose = require("mongoose");
const validator = require("validator");

const paymentSchema = new mongoose.Schema(
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
    customer: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    totalAmountExpected: {
      type: Number,
      required: [true, "Please provide the total amount of this contract"],
    },
    totalAmountAlreadyPaid: {
      type: Number,
      required: [true, "Please provide the total amount of this contract"],
    },

    lastPaymentRound: {
      type: Number,
      default: 0,
    },
    currentPaymentRound: Number,
    startingPaymentDate: Date,
    lastPaymentDate: Date,
    agreedPaymentCurrency: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Currency",
      },
    ],
    preferredPaymentCurrency: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Currency",
      },
    ],
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "partial", "full"],
    },

    paymentBreakdown: {
      initialPaymentInstallment: {
        percentageForInitialPayment:Number,
        initialPaymentAmountExpected: Number,
        initialPaymentAmountPaid: Number,
        lastInitialPaymentAmountMade: Number,
        dateFirstInitialPaymentWasMade: Date,
        dateLastInitialPaymentAmountWasMade: Date,
        initialPaymentStatus: {
          type: String,
          default: "pending",
          enum: ["pending", "partiallyPaid", "fullyPaid"],
        },
      },
      secondInstallmentPayment: {
        percentageForSecondayment:Number,
        secondPaymentAmountExpected: Number,
        secondPaymentAmountPaid: Number,
        lastSecondPaymentAmountMade: Number,
        dateFirstSecondPaymentWasMade: Date,
        dateLastSecondPaymentAmountWasMade: Date,
        secondPaymentStatus: {
          type: String,
          default: "pending",
          enum: ["pending", "partiallyPaid", "fullyPaid"],
        },
      },
      thirdInstallmentPayment: {
        percentageForThirdPayment:Number,
        thirdPaymentAmountExpected: Number,
        thirdPaymentAmountPaid: Number,
        lastThirdPaymentAmountMade: Number,
        thirdSecondPaymentWasMade: Date,
        dateLastThirdPaymentAmountWasMade: Date,
        thirdPaymentStatus: {
          type: String,
          default: "pending",
          enum: ["pending", "partiallyPaid", "fullyPaid"],
        },
      },
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
