const Vendor = require("./../models/vendorModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all vendors
exports.getAllVendors = factory.getAll(Vendor);

//the handler to create a vendor
exports.createVendor = factory.createOne(Vendor);

//the handler to get one vendor
exports.getVendor = factory.getOne(Vendor);

//the handler to update a vendor
exports.updateVendor = factory.updateOne(Vendor);

//the handler to delete a vendor
exports.deleteVendor = factory.deleteOne(Vendor);
