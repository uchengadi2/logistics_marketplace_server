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
    coverImage: {
      type: String,
      required: [false, "Please provide the image of this product"],
    },
    images: [String],
    quantity: {
      type: Number,
      default: 1,
      required: [true, "A product must have quanyity"],
    },
    features: {
      make: {
        type: String,
      },
      model: {
        type: String,
      },
      chassis: {
        type: String,
      },
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    vendor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    permanentLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      permanentLocationAddress: String,
      permanentLocationLatitude: Number,
      permanentLocationLongitide: Number,
      availabilityStatus: {
        type: String,
        enum: ["available", "notAvailable"],
      },
      city: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "City",
        },
      ],
    },
    startingRoute: {
      city: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "City",
        },
      ],
      dateAssigned: String,
      assignedBy: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
