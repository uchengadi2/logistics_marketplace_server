const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[ej];
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
