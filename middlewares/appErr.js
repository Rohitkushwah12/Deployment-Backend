const appErr = (message, status, statusCode) => {
  let error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = {
  appErr,
};
