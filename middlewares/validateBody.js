const HttpError = require("../helpers/HttpError");
const schema = require("../schemas/contacts");

const validateBody = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    next(HttpError(400, error.details[0].message));
  } else {
    next();
  }
};

module.exports = validateBody;