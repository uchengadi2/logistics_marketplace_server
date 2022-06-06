const Category = require("./../models/categoryModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//get all categories
exports.getAllCategories = factory.getAll(Category);
//create a categpries
exports.createCategory = factory.createOne(Category);

//get a category
exports.getCategory = factory.getOne(Category);

//deleting a category
exports.deleteCategory = factory.deleteOne(Category);

//updating a category
exports.updateCategory = factory.updateOne(Category);
