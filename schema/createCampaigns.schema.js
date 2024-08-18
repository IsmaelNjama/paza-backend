const schema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      isNotEmpty: true,
    },
    category: {
      type: "string",
      isNotEmpty: true,
    },
    description: {
      type: "string",
      isNotEmpty: true,
    },
    location: {
      type: "string",
      isNotEmpty: true,
    },
    phone: {
      type: "string",
      isNotEmpty: true,
    },
    age: {
      type: "boolean",
      isNotEmpty: true,
    },
    docs: {
      type: "boolean",
      isNotEmpty: true,
    },
    cards: {
      type: "boolean",
      isNotEmpty: true,
    },
    email: {
      type: "string",
      format: "email",
      isNotEmpty: true,
    },
    budget: {
      type: "string",
      isNotEmpty: true,
    },
    bank: {
      type: "string",
      isNotEmpty: true,
    },
  },
  required: [
    "title",
    "category",
    "description",
    "location",
    "phone",
    "age",
    "docs",
    "cards",
    "email",
    "budget",
    "bank",
  ],
  additionalProperties: true,
};

module.exports = schema;
