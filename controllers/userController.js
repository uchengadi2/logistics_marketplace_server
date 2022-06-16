const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

//create a multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("this file is not an image, Please upload only images", 404),
      false
    );
  }
};

//const upload = multer({ dest: "public/images/users" });

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//when uploading a single file
exports.uploadUserPhoto = upload.single("photo");

//when uploading multiple files
exports.uploadUserPhotos = upload.fields([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 3,
  },
]);

//assuming there were only one image field on the form but accepts multiple images, it can be treated with this script

exports.uploadMultupleImages = upload.array("images", 5);

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
});

//processing multiple images

exports.resizeMultipleImages = catchAsync(async (req, res, next) => {
  console.log(req.files); //logging multiples
  if (!req.files.imageCover || !req.files.images) return next();

  //1. start by processing the cover image
  req.body.imageCover = `user-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`/public/images/users/${req.body.imageCover}`);

  //2. process all the other images in a loop
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, index) => {
      const filename = `user-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`/public/images/users/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = factory.getAll(User);

exports.getMe = (req, rex, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user uploads password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("You cannot update your password using this route"),
      400
    );
  }

  // 2. Filter out unwanted field names that will not be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  // 2. Update User document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

exports.updateUser = factory.updateOne(User);

exports.getUser = factory.getOne(User);

// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

exports.deleteUser = factory.deleteOne(User);
