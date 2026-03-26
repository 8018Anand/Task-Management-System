const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode;

  // Log to console for developer debugging
  console.error(err);

  // Mongoose bad ObjectId (e.g., trying to get a task with an invalid ID format)
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key (e.g., registering with an email that already exists)
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new AppError(message, 400);
  }

  // Mongoose validation error (e.g., missing a required field like 'title')
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new AppError(message, 400);
  }

  // Send standardized response to the frontend
  res.status(error.statusCode || 500).json({
    message: error.message || "Server Error",
  });
};

const notFound = (req, res, next) => {
  next(new AppError(`Not Found - ${req.originalUrl}`, 404));
};

module.exports = errorHandler;
module.exports.notFound = notFound;
