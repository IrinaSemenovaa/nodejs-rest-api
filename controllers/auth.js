const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const HttpError = require("../helpers/HttpError");
const validateSubscription = require("../helpers/validateSubscription");
const asyncHandler = require("../helpers/asyncHandler");

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
});

const getCurrent = asyncHandler(async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
});

const logout = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
});

const updateSubscription = asyncHandler(async (req, res, next) => {
  const { subscription } = req.body;
  const validSubscription = validateSubscription(subscription);

  if (!validSubscription) {
    throw HttpError(400, "Invalid subscription value");
  }

  const userId = req.user.id;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );

  res.json(updatedUser);
});

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
};
