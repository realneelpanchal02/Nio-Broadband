import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation } from "swiper"; // Correct import for Navigation
import "swiper/css";
import "swiper/css/navigation";


const About = () => {
  const testimonials = [
    {
      img: "/assets/images/testimonial-1.jpg",
      name: "Marlene Visconte",
      role: "General Manager - Scouter",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam commodi officia laborum qui iste quidem!",
    },
    {
      img: "/assets/images/testimonial-2.jpg",
      name: "John Spiker",
      role: "Team Leader - Vanquish",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam commodi officia laborum qui iste quidem!",
    },
    {
      img: "/assets/images/testimonial-3.jpg",
      name: "Stella Virtuoso",
      role: "Design Chief - Upscale",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam commodi officia laborum qui iste quidem!",
    },
    {
      img: "/assets/images/testimonial-4.jpg",
      name: "Mike Tim",
      role: "Investor - TechGroww",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam commodi officia laborum qui iste quidem!",
    },
  ];

  const features = [
    ["bi-people-fill", "Customer & User Management"],
    ["bi-box-seam", "Broadband Plan & Package Control"],
    ["bi-speedometer2", "Bandwidth & Speed Monitoring"],
    ["bi-credit-card-2-front-fill", "Billing & Payment Automation"],
    ["bi-shield-lock-fill", "Secure & Reliable System"],
    ["bi-activity", "Real-Time Network Monitoring"],
    ["bi-headset", "Customer Support Management"],
    ["bi-bar-chart-line-fill", "Reports & Analytics"],
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {/* About Section */}
      <section className="about-section text-light py-5" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0" data-aos="fade-right">
              {/* <p className="text-uppercase section-subtitle">About Us</p> */}
              <h1 className="section-title mb-4  mt-5">
                We Are a Trusted Internet & Broadband Service Provider
              </h1>
              <p className="section-desc mb-4">
                We provide a powerful and reliable Internet Broadband Management
                System designed to simplify network operations and improve
                service delivery. Our platform helps internet service providers
                efficiently manage users, plans, bandwidth, billing, and network
                performance from a single, secure system.
              </p>

              <div className="about-features mt-4">
                <ul className="list-unstyled row gx-3 gy-3">
                  {features.map((item, index) => (
                    <li key={index} className="col-md-6">
                      <div className="feature-box d-flex align-items-center">
                        <i className={`bi ${item[0]} feature-icon me-3`}></i>
                        <span>{item[1]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-5 text-center" data-aos="fade-left">
              <img
                className="img-fluid about-img"
                src="/images/about.jpg"
                alt="About Internet Service Provider"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="slider-1 testimonial text-light py-5">
        <div className="container">
          <div className="text-center w-lg-75 m-auto pb-4">
            <p>TESTIMONIALS</p>
            <h2 className="py-2">What Our Clients Say</h2>
          </div>

          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card p-4 h-100 d-flex flex-column justify-content-between border border-success">
                  <p>{t.text}</p>
                  <div className="d-flex align-items-center pt-3">
                    <img className="avatar me-3" src={t.img} alt={t.name} />
                    <div>
                      <h6>{t.name}</h6>
                      <p>{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default About;
