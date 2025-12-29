import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Slider";
import Dashboard from "./components/Dashbord";
import Plan from "./components/Plan";
import State from "./components/State";
import Plan_entry from "./components/Plan_entry";
import Plan_show from "./components/Plan_show";
import Plan_entry_show from "./components/Plan_entry_show";
import Engineer_Registration from "./components/Engineer_Registration"; 
import Login from "./components/Login";
import View_costomer from "./components/View_costomer";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "./App.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="wrapper" style={{ minHeight: "100vh" }}>
      
      {/* Navbar */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Content */}
      <div
        className="content-wrapper"
        style={{
          marginLeft: sidebarOpen ? "250px" : "0px",
          height: "calc(100vh - 56px)",
          padding: "20px",
          background: "#f2f2f2",
          transition: "all 0.3s ease",
        }}
      >
        <section className="content">
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/state" element={<State />} />
              <Route path="/plan_show" element={<Plan_show />} />
              <Route path="/plan_entry" element={<Plan_entry />} />
              <Route path="/plan_entry_show" element={<Plan_entry_show />} />
              <Route path="/engineer_registration" element={<Engineer_Registration />} />
              <Route path="/view_costomer" element={<View_costomer />} />
            </Routes>
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN PANEL */}
        <Route path="/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
