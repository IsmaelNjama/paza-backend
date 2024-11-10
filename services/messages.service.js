const { ObjectId } = require("mongodb");
const { messages, conversations } = require("../utils/mongodb");

// Helper function to safely convert string to ObjectId
const toObjectId = (id) => {
  try {
    if (id instanceof ObjectId) {
      return id;
    }
    if (typeof id === "string") {
      return ObjectId.createFromHexString(id);
    }
    throw new Error("Invalid ID format");
  } catch (error) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }
};

// Helper functions
const createMessage = ({
  sender,
  recipient,
  text,
  conversationId,
  read = false,
}) => {
  return {
    sender: toObjectId(sender),
    recipient: toObjectId(recipient),
    text,
    conversationId: toObjectId(conversationId),
    read,
    createdAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    updatedAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const createConversation = ({ participants }) => ({
  participants: participants.map((participant) => toObjectId(participant)),
  createdAt: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  updatedAt: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
});

const services = {
  createNewConversation: (participants) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newConversation = createConversation({ participants });
        const result = await conversations().insertOne(newConversation);
        resolve(result.insertedId);
      } catch (error) {
        reject(error);
      }
    });
  },

  createMessage: ({ sender, recipient, text }) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Convert strings to ObjectIds
        const senderId = toObjectId(sender);
        const recipientId = toObjectId(recipient);

        // Find or create conversation
        let conversation = await conversations().findOne({
          participants: {
            $all: [senderId, recipientId],
          },
        });

        if (!conversation) {
          const conversationId = await services.createNewConversation([
            senderId,
            recipientId,
          ]);
          conversation = { _id: conversationId };
        }

        // Create and save message
        const newMessage = createMessage({
          sender: senderId,
          recipient: recipientId,
          text,
          conversationId: conversation._id,
        });
        const result = await messages().insertOne(newMessage);
        resolve(result.insertedId);
      } catch (error) {
        reject(error);
      }
    });
  },

  getMessages: (conversationId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = toObjectId(conversationId);
        const result = await messages()
          .find({ conversationId: objectId })
          .toArray();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  },

  getConversations: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = toObjectId(userId);
        const result = await conversations()
          .find({ participants: { $in: [objectId] } })
          .toArray();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;
