const asyncHandler = (handler) => {
  return (req, res, next) => {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
