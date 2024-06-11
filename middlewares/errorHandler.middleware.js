const { ERR_INTERNAL_SERVER } = require("../utils/error");

module.exports = (err, req, res, next) => {
  try {
    const [statusCode, msg] = err;
    res.status(statusCode).send({
      error: true,
      message: msg,
    });
  } catch (error) {
    res.status(500).send(ERR_INTERNAL_SERVER);
  }
};
