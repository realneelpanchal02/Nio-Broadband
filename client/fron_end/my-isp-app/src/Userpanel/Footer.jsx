import React from "react";


import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaEnvelope,
  FaCaretRight,
} from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiAmazon } from "react-icons/si";

const Footer = () => {
  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = [
    { name: "Home", url: "#" },
    { name: "About", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Login", url: "#" },
  ];

  return (
    <>
      {/* Footer */}
      <section className="footer text-light ">
        <div className="container">
          <div className="row" data-aos="fade-right">

            {/* Column 1 */}
            <div className="col-lg-4 py-4 py-md-5">
            <h5 className="fw-bold">Nio Broadband</h5>
            <p className="para-light">
              Nio Broadband provides fast, reliable, and affordable internet
              services for homes and businesses. Stay connected with our 24/7 support.
            </p>

              <div className="d-flex mt-4">
                <a href="#facebook" className="me-3">
                  <FaFacebookF size={24} />
                </a>
                <a href="#twitter" className="me-3">
                  <FaTwitter size={24} />
                </a>
                <a href="#instagram" className="me-3">
                  <FaInstagram size={24} />
                </a>
                <a href="#linkedin">
                  <FaLinkedinIn size={24} />
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-lg-4 py-4 py-md-5">
              <h4 className="py-2">Quick Links</h4>
              {quickLinks.map((link) => (
                <div key={link.name} className="d-flex align-items-center py-2">
                  <FaCaretRight />
                  <a href={link.url} className="text-decoration-none text-light">
                    <p className="ms-3 mb-0">{link.name}</p>
                  </a>
                </div>
              ))}
            </div>

            {/* Column 3 */}
        
  <div className="col-lg-4 py-4 py-md-5">
  <div className="input-group mb-3">
    <input
      type="email"
      className="form-control p-2"
      placeholder="Enter Email"
    />
    <button className="btn btn-secondary text-light">
      <FaEnvelope size={20} />
    </button>
  </div>

  {/* Location Section */}
  <div className="d-flex align-items-center mt-3">
    <FaMapMarkerAlt size={20} className="me-2 text-secondary" />
    <span>Limda Chok, Bardoli</span>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="bottom py-2 text-light">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0">Neel Panchal</p>
           
          </div>
          <div className="d-flex">
            <SiVisa size={28} className="p-1" />
            <SiMastercard size={28} className="p-1" />
            <SiPaypal size={28} className="p-1" />
            <SiAmazon size={28} className="p-1" />
          </div>
        </div>
      </div>

      {/* Back To Top Button */}
      <button onClick={topFunction} id="myBtn">
        <img src="/assets/images/up-arrow.png" alt="Back to top" />
      </button>
    </>
  );
};

export default Footer;
