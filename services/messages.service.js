const { ObjectId } = require("mongodb");
const messages = require("../utils/mongodb").messages;
const conversations = require("../utils/mongodb").conversations;

//Helper functions
const createMessage = ({
  sender,
  recipient,
  text,
  conversationId,
  read = false,
}) => ({
  sender: ObjectId.createFromHexString(sender),
  recipient: ObjectId.createFromHexString(recipient),
  text,
  conversationId: ObjectId.createFromHexString(conversationId),
  read,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const createConversation = ({ participants }) => ({
  participants: participants.map((participant) =>
    ObjectId.createFromHexString(participant)
  ),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const services = {
  createMessage: (message) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newMessage = createMessage(message);
        const result = await messages().insertOne(newMessage);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  },
  createConversation: (conversation) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newConversation = createConversation(conversation);
        const result = await conversations().insertOne(newConversation);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  },
  getMessages: (conversationId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(conversationId);
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
        const objectId = ObjectId.createFromHexString(userId);
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
