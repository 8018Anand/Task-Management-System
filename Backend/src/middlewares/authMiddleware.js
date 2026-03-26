const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");


module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("Not authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    next(new AppError("Invalid token", 401));
  }
};
