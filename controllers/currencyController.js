const Currency = require("./../models/currencyModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all currencies
exports.getAllCurrencies = factory.getAll(Currency);

//the handler to create a currency
exports.createCurrency = factory.createOne(Currency);

//the handler to get one currency
exports.getCurrency = factory.getOne(Currency);

//the handler to update a currency
exports.updateCurrency = factory.updateOne(Currency);

//the handler to delete a currency
exports.deleteCurrency = factory.deleteOne(Currency);
