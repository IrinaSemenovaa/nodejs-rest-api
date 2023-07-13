const HttpError = require("../helpers/HttpError");
const { scheme } = require("../models/contact");

const validateBody = (req, res, next) => {
  const { error } = scheme.contactJoiSchema.validate(req.body);
  if (error) {
    return next(new HttpError(400, error.details[0].message));
  }
  next();
};

module.exports = (schema) => (req, res, next) => validateBody(req, res, next);
