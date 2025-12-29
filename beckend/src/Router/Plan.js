const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Plan = require("../model/Plan");

/* ================= INSERT PLAN ================= */

router.post("/", async (req, res) => {
    try {
        // 1️⃣ Destructure data (date added)
        const { name, price, validity, discount, speed, date } = req.body;

        // 2️⃣ Empty validation
        if (!name || !price || !validity || !discount || !speed || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 3️⃣ Trim name
        const trimmedName = name.trim();

        // 4️⃣ Duplicate check (case-insensitive)
        const existingPlan = await Plan.findOne({
            name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
        });

        if (existingPlan) {
            return res.status(409).json({
                success: false,
                message: "Plan name already exists",
            });
        }

        // 5️⃣ Create & save new plan
        const newPlan = new Plan({
            name: trimmedName,
            price,
            validity,
            discount,
            speed,
            date, // ✅ added
        });

        await newPlan.save();

        // 6️⃣ Success response
        res.status(201).json({
            success: true,
            message: "Plan added successfully",
            data: newPlan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

/* ================= GET PLANS ================= */

router.get("/", async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ================= UPDATE PLAN ================= */

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ Destructure data (date added)
        const { name, price, validity, discount, speed, date } = req.body;

        // 2️⃣ Empty validation
        if (!name || !price || !validity || !discount || !speed || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 3️⃣ Trim name
        const trimmedName = name.trim();

        // 4️⃣ Check plan exists
        const planExists = await Plan.findById(id);
        if (!planExists) {
            return res.status(404).json({
                success: false,
                message: "Plan not found",
            });
        }

        // 5️⃣ Duplicate name check (ignore same ID)
        const duplicatePlan = await Plan.findOne({
            _id: { $ne: id },
            name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
        });

        if (duplicatePlan) {
            return res.status(409).json({
                success: false,
                message: "Plan name already exists",
            });
        }

        // 6️⃣ Update plan
        const updatedPlan = await Plan.findByIdAndUpdate(
            id,
            {
                name: trimmedName,
                price,
                validity,
                discount,
                speed,
                date, // ✅ added
            },
            { new: true }
        );

        // 7️⃣ Success response
        res.status(200).json({
            success: true,
            message: "Plan updated successfully",
            data: updatedPlan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

/* ================= DELETE PLAN ================= */

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if plan exists
        const plan = await Plan.findById(id);
        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found",
            });
        }

        // Delete plan
        await Plan.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Plan deleted successfully",
        });
    } catch (error) {
        console.error("DELETE ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

module.exports = router;
