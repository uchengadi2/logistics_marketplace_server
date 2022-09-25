const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Every product must have a name"],
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    plateNumber: {
      type: String,
    },
    imageCover: {
      type: String,
      required: [false, "Please provide the image cover"],
    },
    images: {
      type: String,
    },
    firstImage: {
      type: String,
    },
    secondImage: {
      type: String,
    },
    thirdImage: {
      type: String,
    },
    fourthImage: {
      type: String,
    },

    quantity: {
      type: Number,
      default: 1,
      required: [false, "A product must have quanyity"],
    },

    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
    },
    address: {
      type: String,
    },
    city: {
      type: mongoose.Schema.ObjectId,
      ref: "City",
    },
    state: {
      type: mongoose.Schema.ObjectId,
      ref: "State",
    },
    country: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
    },

    make: {
      type: String,
    },
    model: {
      type: String,
    },
    chassis: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
