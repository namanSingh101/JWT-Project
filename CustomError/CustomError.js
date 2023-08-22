class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this,this.constructor)
  }
}
const createCustomError = (message,statusCode)=>{
  return new CustomAPIError(message,statusCode)
  }

module.exports = {CustomAPIError,createCustomError};
