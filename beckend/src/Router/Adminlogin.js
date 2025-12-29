const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const AdminLogin = require('../model/Adminlogin');

// Admin login route


// const createAdmin = async () => {
//   try {
//     const email = "admin@example.com";  // your admin email
//     const password = "admin123";        // your admin password
//     const hashedPassword = bcrypt.hashSync(password, 10);

//     // Check if admin already exists
//     const exists = await AdminLogin.findOne({ adminemailid: email });
//     if (exists) {
//       console.log('Admin already exists!');
//       process.exit(0);
//     }

//     const admin = new AdminLogin({
//       adminemailid: email,
//       password: hashedPassword
//     });

//     await admin.save();
//     console.log('Admin created successfully!');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error creating admin:', err);
//     process.exit(1);
//   }
// };

router.post("/", async (req, res) => {
  try {
    // ✅ FRONTEND SE AANE WALA DATA CHECK
    console.log("Request body:", req.body);

    const { adminemailid, password } = req.body;

    console.log("Email:", adminemailid);
    console.log("Password:", password);

    // Find admin by email
    const admin = await AdminLogin.findOne({ adminemailid });
    console.log("Admin from DB:", admin);

    if (!admin) {
      return res.status(401).json({ message: "Email not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
