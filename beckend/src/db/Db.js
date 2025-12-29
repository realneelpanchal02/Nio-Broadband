const mongoose = require("mongoose");

function user_panal_register() {
  const DB_URL = process.env.DB_URL
 || "mongodb+srv://admin:admin1234@cluster0.djzy46f.mongodb.net/internat";
  mongoose.connect(DB_URL) // connect is method  to connect  nodejs and mongodb Mongoose is libery 
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}
user_panal_register();

//   Admin penal  State  Feild


