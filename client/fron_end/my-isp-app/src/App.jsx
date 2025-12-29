import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Userpanel/Navbar";
import Footer from "./Userpanel/Footer";
import Home from "./Userpanel/Home";
import About from "./Userpanel/About";
import Contact from "./Userpanel/Contact";
import Login from  "./Userpanel/Login";
import RG from "./Userpanel/RG";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Custom CSS (from public folder)
import "./css/style.css";
import "./css/swiper.css";
import "./css/aos.min.css"

// animation 
import AOS from "aos";
import { useEffect } from "react";

// Pages
// const Home = () => <h1>Home Page</h1>;
// const About = () => <h1>About Page</h1>;
// const Contact = () => <h1>Contact Page</h1>;

function App() {
    useEffect(() => {
    AOS.init({
      duration: 1200,   // smooth animation
      easing: "ease-in-out",
      once: true,       // animation only once
    });
  }, []);

  return (
    
<>

    <Router>
      <Navbar/>
 
      <div className="box1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
           <Route path="/rg" element={<RG />} />
        
        </Routes>
      </div>
         <Footer/>
    </Router>

</>
  );
}

export default App;
