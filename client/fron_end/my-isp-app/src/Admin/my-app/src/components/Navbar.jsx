import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">

      {/* LEFT */}
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* 🔥 SIDEBAR TOGGLE */}
          <button
            className="nav-link btn"
            type="button"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>
        </li>

        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
      </ul>

      {/* RIGHT */}
      <ul className="navbar-nav ml-auto">

        {/* LOGOUT */}
        <li className="nav-item d-flex align-items-center">
          <button className="btn btn-secondary btn-sm">
            <i className="fas fa-sign-out-alt me-1"></i>
            Logout
          </button>
        </li>

        {/* FULLSCREEN */}
        <li className="nav-item">
          <button
            className="nav-link btn"
            type="button"
            onClick={toggleFullscreen}
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
