const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");
const { appErr } = require("./appErr");

const isLogin = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) return next(appErr("there is no token attached to the header"));

  const decodedUser = verifyToken(token);
  req.user = decodedUser.id;

  if (!decodedUser)
    return next(appErr("Invalid/Expired token please login again", 401));

  next();
};

module.exports = isLogin;
