import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Custom CSS
import "./css/style.css";
import "./css/swiper.css";

// Components & Pages - Update paths if components are in different structure
const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href="/">🌐 Nio Broadband</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
          <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
          <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-dark text-white text-center py-4 mt-5">
    <p>&copy; 2024 Nio Broadband. All rights reserved.</p>
  </footer>
);

const Home = () => (
  <div className="container my-5">
    <h1 className="display-4 mb-4">Welcome to Nio Broadband</h1>
    <p className="lead">High-speed internet connectivity for your needs.</p>
    <button className="btn btn-primary btn-lg">Get Started</button>
  </div>
);

const About = () => (
  <div className="container my-5">
    <h2>About Us</h2>
    <p>Nio Broadband is a leading ISP (Internet Service Provider) company...</p>
  </div>
);

const Contact = () => (
  <div className="container my-5">
    <h2>Contact Us</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea className="form-control" id="message" rows="5"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  </div>
);

const Login = () => (
  <div className="container my-5">
    <h2>Login</h2>
    <form style={{ maxWidth: '400px' }}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  </div>
);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
