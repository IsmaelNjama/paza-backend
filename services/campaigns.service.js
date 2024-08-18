const { ObjectId } = require("mongodb");
const campaigns = require("../utils/mongodb").campaigns;

const services = {
  createCampaign: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const timestamp = new Date().toISOString();
        const campaign = await campaigns().insertOne({
          ...body,
          createdAt: timestamp,
        });
        resolve(campaign);
      } catch (error) {
        reject(error);
      }
    });
  },

  getCampaigns: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const campaignsList = await campaigns().find({}).toArray();
        resolve(campaignsList);
      } catch (error) {
        reject(error);
      }
    });
  },

  getCampaignById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const campaign = await campaigns().findOne({ _id: objectId });

        resolve(campaign);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateCampaign: (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const campaign = await campaigns().updateOne(
          { _id: objectId },
          { $set: body }
        );
        resolve(campaign);
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteCampaign: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const objectId = ObjectId.createFromHexString(id);
        const deletedCampaign = await campaigns().deleteOne({ _id: objectId });
        resolve(deletedCampaign);
      } catch (error) {
        reject(error);
      }
    });
  },
};
module.exports = services;
