const express = require("express");
const router = express.Router();
const Visa = require("../models/Visa");

// Add Visa
router.post("/", async (req, res) => {
  try {
    const newVisa = new Visa(req.body);
    await newVisa.save();
    res.status(201).json(newVisa);
  } catch (error) {
    res.status(500).json({ error: "Failed to add visa." });
  }
});

// Get All Visa
router.get("/", async (req, res) => {
  try {
    const visas = await Visa.find();
    res.status(200).json(visas);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch visas." });
  }
});

// Get Visa by ID
router.get("/:id", async (req, res) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) {
      return res.status(404).json({ error: "Visa not found." });
    }
    res.status(200).json(visa);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch visa details." });
  }
});

// Update Visa
router.put("/:id", async (req, res) => {
  try {
    const udpatedVisa = await Visa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update visa." });
  }
});

// Delete Visa
router.delete("/:id", async (req, res) => {
  try {
    await Visa.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Visa deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete visa." });
  }
});

module.exports = router;
