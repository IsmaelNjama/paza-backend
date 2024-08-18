const express = require("express");

const router = express.Router();

const campaignsController = require("../controllers/campaigns.controller");
const createCampaignSchema = require("../schema/createCampaigns.schema");
const validate = require("../utils/schemaValidate");

router.post(
  "/create",
  validate(createCampaignSchema),
  campaignsController.createCampaign
);
router.get("/", campaignsController.getCampaigns);
router.get("/:id", campaignsController.getCampaignById);
router.put("/:id", campaignsController.updateCampaign);
router.delete("/:id", campaignsController.deleteCampaign);

module.exports = router;
