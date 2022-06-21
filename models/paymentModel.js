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
      default: 0,
      required: [false, "Please provide the total amount of this contract"],
    },

    lastPaymentRound: {
      type: Number,
      default: 0,
    },
    currentPaymentRound: { type: Number, default: 0 },
    startingPaymentDate: Date,
    lastPaymentDate: Date,
    agreedPaymentCurrency: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Currency",
      },
    ],

    agreedNumberOfPaymentInstallements: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "partial", "full"],
    },

    paymentBreakdown: {
      initialPaymentInstallment: {
        percentageForInitialPayment: { type: Number, default: 0 },
        initialPaymentAmountExpected: { type: Number, default: 0 },
        initialPaymentAmountPaid: { type: Number, default: 0 },
        lastInitialPaymentAmountMade: { type: Number, default: 0 },
        dateFirstInitialPaymentWasMade: Date,
        dateLastInitialPaymentAmountWasMade: Date,
        initialPaymentStatus: {
          type: String,
          default: "pending",
          enum: ["pending", "partiallyPaid", "fullyPaid"],
        },
      },
      secondInstallmentPayment: {
        percentageForSecondPayment: { type: Number, default: 0 },
        secondPaymentAmountExpected: { type: Number, default: 0 },
        secondPaymentAmountPaid: { type: Number, default: 0 },
        lastSecondPaymentAmountMade: { type: Number, default: 0 },
        dateFirstSecondPaymentWasMade: Date,
        dateLastSecondPaymentAmountWasMade: Date,
        secondPaymentStatus: {
          type: String,
          default: "pending",
          enum: ["pending", "partiallyPaid", "fullyPaid"],
        },
      },
      thirdInstallmentPayment: {
        percentageForThirdPayment: { type: Number, default: 0 },
        thirdPaymentAmountExpected: { type: Number, default: 0 },
        thirdPaymentAmountPaid: { type: Number, default: 0 },
        lastThirdPaymentAmountMade: { type: Number, default: 0 },
        thirdSecondPaymentWasMade: Date,
        dateLastThirdPaymentAmountWasMade: Date,
        thirdPaymentStatus: {
          type: String,
          default: "pending",
          enum: ["pending", "partiallyPaid", "fullyPaid"],
        },
      },
    },
    paymentAgreementBookedBy: [
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

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
