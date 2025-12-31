const express = require("express");
const router = express.Router();
const engineer = require("../model/Engineer_detail");


router.post("/", async (req, res) => {
    try {
        const { name, address, gender, email, password, mobile, dob, pincode } = req.body;

        // 2️⃣ Empty validation
        if (!name || !address || !gender || !email || !password || !mobile || !dob || !pincode) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        //  trim  name 
        const trimmedName = name.trim();
        // 3 email dublication check

        // 4️⃣ Duplicate check (case-insensitive)
        const existingEngineer = await engineer.findOne({
            email: { $regex: new RegExp(`^${email}$`, "i") },
        });


        if (existingEngineer) {
            return res.status(409).json({
                success: false,
                message: " Email name already exists",
            });
        }

        // save new Engineer_detail
        const Engineer = new engineer({
            name: trimmedName,
            address,
            gender,
            email,
            password,
            mobile,
            dob,
            pincode,

        })
        
        await Engineer.save()
        res.status(201).json({
            success: true,
            message: "Plan added successfully",
        })

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }




})


module.exports = router;

