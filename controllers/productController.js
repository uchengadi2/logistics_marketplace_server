const Product = require("./../models/productModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all product
exports.getAllProducts = factory.getAll(Product);

//the handler to create a product
exports.createProduct = factory.createOne(Product);

//the handler to get one product
exports.getProduct = factory.getOne(Product);

//the handler to update a product
exports.updateProduct = factory.updateOne(Product);

//the handler to delete a product
exports.deleteProduct = factory.deleteOne(Product);
