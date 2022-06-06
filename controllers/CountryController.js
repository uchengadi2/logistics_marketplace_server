const Country = require("../models/countryModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//the handler to get all countries
exports.getAllCountries = factory.getAll(Country);

//the handler to create a country
exports.createCountry = factory.createOne(Country);

//the handler to get one country
exports.getCountry = factory.getOne(Country);

//the handler to update a country
exports.updateCountry = factory.updateOne(Country);

//the handler to delete a country
exports.deleteCountry = factory.deleteOne(Country);
