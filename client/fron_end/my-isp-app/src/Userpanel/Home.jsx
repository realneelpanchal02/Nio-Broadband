import React from "react";
import Information from "../Userpanel/Information";

const Home = () => {
  return (
   <>
    <section className="home d-flex align-items-center min-vh-100" id="header">
      <div className="container text-light">
        <div className="row">
          <div
            className="col-lg-7 col-md-10"
            data-aos="fade-right"
          >
            <h1 className="headline mb-3">
              Nio<span className="home_text">Broadband</span>
              <br />
              INTERNET SERVICE PROVIDER
            </h1>

            <p className="para para-light mb-4">
               Nio Broadband is your trusted internet service provider, delivering fast, reliable, and affordable broadband plans for homes and businesses. 
               Stay connected, stream seamlessly, and enjoy uninterrupted service backed by our 24/7 support.

            </p>

            <div className="d-flex align-items-center mb-2">
              <i className="fas fa-laptop-house fa-lg me-3 text-success"></i>
              <p className="mb-0">Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="d-flex align-items-center mb-4">
              <i className="fas fa-wifi fa-lg me-3 text-success"></i>
              <p className="mb-0">Lorem ipsum dolor sit amet.</p>
            </div>

            <a href="#plans" className="btn btn-outline-success px-4 py-2">
              View Plans
            </a>
          </div>
        </div>
      </div>
      {/* new contend */}
         
    </section>
     <Information/>
   </>
 
  );
};

export default Home;
