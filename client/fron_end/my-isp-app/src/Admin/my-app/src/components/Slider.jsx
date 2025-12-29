  import React, { useState } from "react";
  import { Link } from "react-router-dom";

  const Sidebar = () => {
    // Use a single state to track which menu is open
    const [openMenu, setOpenMenu] = useState("");

    const toggleMenu = (menu) => {
      setOpenMenu(openMenu === menu ? "" : menu); // Toggle
    };

    const menuItemClass = (menu) =>
      `nav-item ${openMenu === menu ? "menu-open" : ""}`;

    const subMenuStyle = (menu) => ({
      display: openMenu === menu ? "block" : "none",
      transition: "all 0.3s ease", // Smooth animation
    });

    return (
      <aside className="main-sidebar sidebar-dark-primary" style={{ height: "100vh" }}>
        {/* Brand Logo */}
        <a href="#" className="brand-link d-flex align-items-center justify-content-center">
          <img
            src="dist/img/logo.png"
            alt="Admin Logo"
            className="brand-image"
            style={{ width: "50%", height: "50%", objectFit: "cover" }}
          />
        </a>

        <div className="sidebar">
          {/* User Panel */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">Faeez_shaikh</a>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column">
              {/* Dashboard */}
              <li className={menuItemClass("dashboard")}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => toggleMenu("dashboard")}
                >
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={subMenuStyle("dashboard")}>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v1</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Menu */}
              <li className={menuItemClass("menu")}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => toggleMenu("menu")}
                >
                  <i className="nav-icon fas fa-cogs"></i>
                  <p>
                    Menu
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={subMenuStyle("menu")}>
                  <li className="nav-item">
                    <Link to="/state" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>State</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/plan" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Add Plan</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/plan_show" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Show Plan</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/plan_entry" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Plan Entry</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/plan_entry_show" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Plan Entry Show</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/engineer_registration" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Engineer Registration</p>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Customer Details */}
              <li className={menuItemClass("customer")}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => toggleMenu("customer")}
                >
                  <i className="nav-icon fas fa-users"></i>
                  <p>
                    Customer Details
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview" style={subMenuStyle("customer")}>
                  <li className="nav-item">
                    <Link to="/view_costomer" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p> View Costomer </p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  };

  export default Sidebar;
