const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "assigned"],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    consignmentCountry: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],

    destinationCountry: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Country",
      },
    ],
    orderQuantity: {
      type: Number,
      required: [false, "Please provide the quantity you are ordering"],
      min: 1,
    },
    totalUnassignedQuantity: {
      type: Number,
      required: [false, "Please provide the quantity you are ordering"],
      min: 1,
    },
    orderedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    remainingOrderedQuantity: Number,

    consignment: {
      name: {
        type: String,
      },
      description: {
        type: String,
        trim: true,
      },
      weight: {
        weight: {
          type: Number,
        },
        unit: String,
      },
      owner: {
        type: String,
        required: [
          false,
          "Please provide the name of the owner of this consignment",
        ],
      },
      type: {
        type: String,
        required: [false, "Please provide the consignment type"],
      },
      quantity: {
        type: Number,
        default: 1,
      },
      coverImage: String,
      images: [String],
    },
    sourceLocation: {
      sourceName: {
        type: String,
        required: [false, "Please provide the name of the location"],
      },
      sourceDescription: {
        type: String,
        trim: true,
      },
      sourceAddress: {
        type: String,
        trim: true,
      },
      sourceCoordinates: [Number],
      // sourceLatitude: Number,
      // sourceLongtitude: Number,
      sourceType: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      sourceCity: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "City",
        },
      ],
      sourceState: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "State",
        },
      ],
      sourcePlaceType: {
        type: String,
        default: "others",
        enum: [
          "warehouse",
          "port",
          "jetty",
          "airport",
          "park",
          "street",
          "businessPlace",
          "residentialBuilding",
          "school",
          "complex",
          "market",
          "placeofWorship",
          "militaryZone",
          "plantation",
          "farm",
          "forest",
          "zoo",
          "barracks",
          "others",
        ],
      },
      sourceContactPerson: {
        contactPersonName: String,
        contactPersonPhoneNumber: String,
      },
    },

    destinationLocation: {
      destinationName: {
        type: String,
        required: [
          false,
          "Please provide the name of the destination location",
        ],
      },
      destinationDescription: {
        type: String,
        trim: true,
      },
      destinationAddress: {
        type: String,
        trim: true,
      },
      destinationCoordinates: [Number],
      // destinationLatitude: Number,
      // destinationLongtitude: Number,
      destinationType: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      destinationCity: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "City",
        },
      ],
      destinationState: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "State",
        },
      ],
      destinationPlaceType: {
        type: String,
        default: "others",
        enum: [
          "warehouse",
          "port",
          "jetty",
          "airport",
          "park",
          "street",
          "businessPlace",
          "residentialBuilding",
          "school",
          "complex",
          "market",
          "placeofWorship",
          "militaryZone",
          "plantation",
          "farm",
          "forest",
          "zoo",
          "barracks",
          "others",
        ],
      },
      destinationContactPerson: {
        destinationContactPersonName: String,
        destinationContactPersonPhoneNumber: String,
      },
    },
    logisticsInsurancetype: {
      type: String,
      enum: [
        "notApplicable",
        "atSourceCountryOnly",
        "atDestinationCountryOnly",
        "fromSourceToDestination",
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
