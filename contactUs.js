import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Col, Row, Card } from "react-bootstrap";

////// ICONS (FontAwesome package) /////
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faMap, faPhone } from "@fortawesome/free-solid-svg-icons";

///////  REACT-BOOTSTRAP STYLING ///////////
import "bootstrap/dist/css/bootstrap.min.css";

//IMAGES
import aboutUsImg from "../images/aboutUs_img_cropped2.webp";
// import aboutUsImg2 from "../images/aboutUs_img_cropped2.png";

const ContactUs = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="page_content">
      <Helmet>
        <title>
          Contact GoWithGig: Your Atlanta Rideshare Rental Partner | Directions
          To Your Next Office
        </title>
        <meta
          name="description"
          content="Get in touch with GoWithGig for top-notch ride-share car rental services in Atlanta, Georgia. Whether you need a reliable vehicle for your next trip or have queries about our services, our team is here to assist you. Contact us today for seamless, affordable, and convenient ride-sharing solutions. Drive with us and explore Atlanta in comfort and style!"
        />
      </Helmet>
      <header className="header_aboutUs">
        <h1 className="h1_home">Contact Us</h1>
        <h2 className="header_h2">
          Contact Us For Directions To Your Next Office
        </h2>
      </header>
      <div className=" ">
        <Row className="" style={{ marginRight: "0px", marginLeft: "0px" }}>
          <Col md={12}>
            <Card className="border-0 bg-transparent text-center">
              <Card.Title className="display-4 fw-bold">
                Give Us A Call!
              </Card.Title>
              <Card.Body className="fw-bold text-center">
                <p className="">
                  Your journey with GoWithGig is just a message away! We are
                  here to ensure your car rental experience is seamless,
                  enjoyable, and tailored to your needs. Whether you have
                  questions, need assistance, or want to share your experience,
                  our dedicated team is eager to hear from you. Reach out to us
                  today, and let's make your ridesharing adventures
                  extraordinary. We value your feedback and are committed to
                  providing exceptional service, so don't hesitate to get in
                  touch. Your next great ride starts with a conversation – let's
                  connect!
                </p>
                <Row>
                  <Col md={8} className="g-0 position-relative">
                    <div style={{ paddingBottom: "56.25%" }}>
                      {" "}
                      {/* Aspect Ratio Container */}
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13273.773300085857!2d-84.7722605!3d33.7233507!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f527bce8696a49%3A0xe61859bf449a9e81!2sGo%20With%20Gig%20Car!5e0!3m2!1sen!2sus!4v1702086959186!5m2!1sen!2sus"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </Col>
                  <Col md={4} className="fw-bold">
                    <h5 className="text-center fw-bold">
                      Open Monday - Friday 9AM - 6PM, <br />
                      Saturday 10AM - 3PM
                    </h5>
                    <Button className="mx-auto btn btn-warning m-2 btn-sm">
                      <a
                        href="https://www.google.com/maps/place/Go+With+Gig+Car/@33.7233507,-84.7748354,17z/data=!3m1!4b1!4m6!3m5!1s0x88f527bce8696a49:0xe61859bf449a9e81!8m2!3d33.7233507!4d-84.7722605!16s%2Fg%2F11l2svvgsc?entry=ttu"
                        className="text-dark"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faMap} size="" />
                        <strong> 7498 Douglas Blvd, Douglasville, GA</strong>
                      </a>
                    </Button>

                    <Button className="mx-auto btn m-2  btn-warning btn-sm">
                      <a href="tel:+18448207433" className="text-dark">
                        <FontAwesomeIcon icon={faPhone} size="1x" />
                        Reservations: (844) 820-RIDE
                      </a>
                    </Button>
                    <Button className="mx-auto m-2  btn btn-warning btn-sm">
                      <a href="tel:+18443392886" className="text-dark">
                        <FontAwesomeIcon icon={faPhone} size="1x" />
                        Support: (844) 339-2886
                      </a>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;
