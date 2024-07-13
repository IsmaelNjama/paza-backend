const schema = {
  type: "object",
  properties: {
    task: {
      type: "string",
      isNotEmpty: true,
    },
    assignee: {
      type: "string",
      isNotEmpty: true,
    },
    priority: {
      type: "string",
      isNotEmpty: true,
    },
    budget: {
      type: "string",
      isNotEmpty: true,
    },
    status: {
      type: "string",
      isNotEmpty: true,
    },
    start: {
      type: "string",
      isNotEmpty: true,
    },
    due: {
      type: "string",
      isNotEmpty: true,
    },
    repeat: {
      type: "string",
      isNotEmpty: true,
    },
    desc: {
      type: "string",
      isNotEmpty: true,
    },
  },
  required: [
    "task",
    "assignee",
    "priority",
    "status",
    "start",
    "due",
    "repeat",
    "desc",
  ],
  additionalProperties: true,
};

module.exports = schema;
