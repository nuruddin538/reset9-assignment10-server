const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const { route } = require("./visaRoutes");

// Apply for Visa
router.post("/", async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ error: "Failed to apply for visa." });
  }
});
// Get User Application
router.get("/:userId", async (req, res) => {
  try {
    const applications = await Application.find({
      appliedBy: req.params.userId,
    }).populate("visaId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications." });
  }
});

// Cancel Application
router.delete("/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application cancelled successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel application." });
  }
});

module.exports = router;
