const schema = {
  type: "object",
  properties: {
    firstname: { type: "string", isNotEmpty: true },
    lastname: { type: "string", isNotEmpty: true },
    email: { type: "string", format: "email", isNotEmpty: true },
    birthday: { type: "string", isNotEmpty: true },
    gender: { type: "string", isNotEmpty: true },
    phone: { type: "string", isNotEmpty: true },
    city: { type: "string", isNotEmpty: true },
    password: { type: "string", isNotEmpty: true },
    account: {
      type: "object",

      additionalProperties: true,
    },
    createdAt: { type: "string", format: "date-time" },
  },
  required: [
    "firstname",
    "lastname",
    "email",
    "birthday",
    "gender",
    "phone",
    "city",
    "password",
  ],
  additionalProperties: true,
};

module.exports = schema;
