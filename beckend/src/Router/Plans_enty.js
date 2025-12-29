  const express = require("express");
  const router = express.Router();
  const PlanEntry = require("../model/Plan_entry");

  // GET all entries
  router.get("/", async (req, res) => {
    try {
      const entries = await PlanEntry.find().populate("plan");
      res.json(entries);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch plan entries" });
    }
  });

  // POST add entry
  router.post("/", async (req, res) => {
    try {
      const { state, plan } = req.body;
      const entry = new PlanEntry({ state, plan });
      const saved = await entry.save();
      const populated = await saved.populate("plan");
      res.json(populated);
    } catch (err) {
      res.status(500).json({ error: "Failed to add plan entry" });
    }
  });

  // PUT update entry
  router.put("/:id", async (req, res) => {
    try {
      const { state, plan } = req.body;
      const updated = await PlanEntry.findByIdAndUpdate(
        req.params.id,
        { state, plan },
        { new: true }
      ).populate("plan");
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to update plan entry" });
    }
  });

  // DELETE plan entry by ID
  router.delete("/:id", async (req, res) => {
    try {
      const deleted = await PlanEntry.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Plan entry not found" });

      res.json({ message: "Plan entry deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete plan entry" });
    }
  });

  module.exports = router;
