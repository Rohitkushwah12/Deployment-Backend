const getTokenFromHeader = (req) => {
  // Get the token from the request headers
  const headerObj = req.headers["authorization"];
  let token;
  if (headerObj) {
    token = headerObj.split(" ")[1];
  } else {
    return false;
  }
  if (token !== undefined) {
    return token;
  }
};

module.exports = getTokenFromHeader;
