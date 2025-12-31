const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // ✅ YE LINE ADD KARO
const State = require("../model/State");

/* ADD STATE */
router.post("/", async (req, res) => {
  try {
    let { state } = req.body;

    // ✅ Empty validation
    if (!state || !state.trim()) {
      return res.json({
        success: false,
        message: "State name is required",
      });
    }

    state = state.trim().toLowerCase();

    // ✅ Duplicate validation (case-insensitive)
    const exists = await State.findOne({ state });
    if (exists) {
      return res.json({
        success: false,
        message: "Duplicate state not allowed",
      });
    }

    const newState = new State({ state });
    await newState.save();

    res.json({
      success: true,
      message: "State inserted successfully",
      data: newState,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* GET ALL STATES */
router.get("/", async (req, res) => {
  
    const states = await State.find()
  res.json(states);
 });

// UPDATE state by ID
/* ================= UPDATE STATE ================= */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { state } = req.body;

    // ✅ ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid state ID",
      });
    }

    // ✅ Empty validation
    if (!state || !state.trim()) {
      return res.json({
        success: false,
        message: "State name is required",
      });
    }

    state = state.trim().toLowerCase();

    // ✅ Duplicate check (exclude current id)
    const exists = await State.findOne({
      state,
      _id: { $ne: id },
    });

    if (exists) {
      return res.json({
        success: false,
        message: "Duplicate state not allowed",
      });
    }

    // ✅ Update
    const updatedState = await State.findByIdAndUpdate(
      id,
      { state },
      { new: true }
    );

    if (!updatedState) {
      return res.status(404).json({
        success: false,
        message: "State not found",
      });
    }

    res.json({
      success: true,
      message: "State updated successfully",
      data: updatedState,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}); 


/* DELETE STATE BY ID */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedState = await State.findByIdAndDelete(id);

    if (!deletedState) {
      return res.json({
        success: false,
        message: "State not found"
      });
    }

    res.json({
      success: true,
      message: "State deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
module.exports = router;
