const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the category name"],
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      default: "vehicle",
      enum: ["vehicle", "warehouse"],
    },
    image: {
      type: String,
      required: [false, "Please provide the image cover"],
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
