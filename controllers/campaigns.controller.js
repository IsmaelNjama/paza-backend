const campaignsServices = require("../services/campaigns.service");
const { ERR_CAMPAIGN_NOT_FOUND } = require("../utils/error");

module.exports = {
  createCampaign: async (req, res, next) => {
    try {
      const campaign = await campaignsServices.createCampaign(req.body);
      res.status(201).send("Campaign created successfully");
    } catch (error) {
      console.log("🚀 ~ addCampaign: ~ error:", error);

      next(error);
    }
  },

  getCampaigns: async (req, res, next) => {
    try {
      const campaigns = await campaignsServices.getCampaigns();
      res.status(200).send(campaigns);
    } catch (error) {
      next(error);
    }
  },

  getCampaignById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const campaign = await campaignsServices.getCampaignById(id);

      if (!campaign) {
        return next(ERR_CAMPAIGN_NOT_FOUND);
      }
      res.status(200).send(campaign);
    } catch (error) {
      next(error);
    }
  },

  updateCampaign: async (req, res, next) => {
    try {
      const id = req.params.id;
      const campaign = await campaignsServices.updateCampaign(id, req.body);

      if (campaign.modifiedCount === 1) {
        res.status(200).send("Campaign updated successfully");
      }
    } catch (error) {
      next(error);
    }
  },

  deleteCampaign: async (req, res, next) => {
    try {
      const id = req.params.id;
      const campaign = await campaignsServices.deleteCampaign(id);

      if (campaign.deletedCount === 1) {
        res.status(200).send("Campaign deleted successfully");
      }
    } catch (error) {
      next(error);
    }
  },
};
