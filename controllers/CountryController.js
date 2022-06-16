const multer = require("multer");
const sharp = require("sharp");
const Country = require("../models/countryModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const multerStorage = multer.memoryStorage();

//create a multer filter
const multerFilter = (req, file, cb) => {
  if (req.mimetype.startWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("this file is not an image, Please upload only images", 404),
      false
    );
  }
};

// const upload = multer({ dest: "public/img/user" });

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//when uploading a single file
exports.uploadCountryFlagImage = upload.single("flag");

exports.resizeCountryFlagImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `country-${req.country.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`/public/images/countries/${req.file.filename}`);

  next();
});

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
