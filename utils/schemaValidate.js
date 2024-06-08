const ajv = require("./ajv");

const validate = (schema) => {
  return (req, res, next) => {
    const data = req.body;
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      const message = validate.errors
        .map((error) => {
          return `${error.instancePath.slice(1)}:${error.message}`;
        })
        .join(", ");
      return res.status(400).send(message);
    }
    next();
  };
};

module.exports = validate;
