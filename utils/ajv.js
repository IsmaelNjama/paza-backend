const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv({ allErrors: true });

addFormats(ajv);

ajv.addKeyword({
  keyword: "isNotEmpty",
  type: "string",
  validate: (schema, data) => {
    return typeof data === "string" && data.trim() !== "";
  },
  error: {
    message: "This field is required",
  },
  errors: true,
});

module.exports = ajv;
