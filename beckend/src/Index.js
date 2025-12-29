  const express = require("express");
  const cors = require("cors");
  require("./db/Db");

  const stateRoutes = require("./Router/State");
  const planRouter = require("./Router/Plan");
  const Plans_entry=require("./Router/Plans_enty")
  const Engineer=require("./Router/Engineer_detail")
  const Admin=require("./Router/Adminlogin")

  // const Login= require("./Router/Admin_login")

  const app = express();
  app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5174", // Admin panel
    "http://localhost:5173"  // User panel
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



  app.use("/state", stateRoutes);
  app.use("/plans", planRouter);
  app.use("/plan_entry", Plans_entry);
  app.use("/engineer",Engineer );
    app.use("/adminlogin",Admin );


  // app.use("/login", Login);
    
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
