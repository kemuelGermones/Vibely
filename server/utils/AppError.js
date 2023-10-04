// Extension of error class to have 
// HTTP status code
class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = AppError;
