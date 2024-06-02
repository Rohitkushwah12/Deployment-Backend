const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  const stack = err.stack;

  res.status(statusCode).json({
    message,
    stack,
  });
};

module.exports = { globalErrorHandler };
