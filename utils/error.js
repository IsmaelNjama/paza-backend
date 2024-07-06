module.exports = {
  ERR_NOT_FOUND: [404, "Not Found"],
  ERR_REGISTER_ALREADY_EXIST: [409, "Email already Registered"],
  ERR_BAD_REQUEST: [400, "email or password incorrect"],
  ERR_MISSING_CODE: [400, "Please provide invitation Code"],
  ERR_INTERNAL_SERVER: [500, "Internal Server Error"],
  ERR_UNPROCESSABLE: [422, "Missing Token"],
  ERR_UNAUTHORIZED: [401, "Unauthorized,please verify your account"],
  ERR_NOT_ACCEPTABLE: [406, "Not Acceptable"],
  ERR_TOO_MANY_REQUESTS: [429, "Too Many Requests"],
  ERR_FORBIDDEN: [403, "Forbidden"],
  ERR_INVALID: [498, "Try again later"],
  ERR_INVALID_CODE: [422, "Invalid invitation Code"],
};
