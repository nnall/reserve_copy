import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

//// REACT BOOTSTRAP /////
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Accordion from "react-bootstrap/Accordion";

////// IMAGES ////////
import driverImage from "../images/main_home.webp";
import equinox from "../images/equinox.webp";
import malibu from "../images/malibu.webp";
import serviceImage from "../images/service_img.webp";

////// ICONS (FontAwesome package) /////
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

///// ORIGINAL ICONS //////
import atlanta_svg from "../icons/atlanta.svg";
import chicago_svg from "../icons/chicago.svg";
// import logo from "../images/originals/logo_cropped_noName.png"

import {
  faCar,
  faClipboardUser,
  faCreditCard,
  faSackDollar,
  faHandHoldingDollar,
  faCircleCheck,
  faHeadset,
  faSquarePlus,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

///////  REACT-BOOTSTRAP STYLING ///////////
import "bootstrap/dist/css/bootstrap.min.css";

//CALL US BUTTON
import CallUsBtn from "./callUsBtn.js";

const Home = () => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.scrollTo(0, 0);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="page_content">
      <Helmet>
        <title>
          GoWithGig: Premier Rideshare Car Rentals in Atlanta | Drive & Earn
          with Ease
        </title>
        <meta
          name="description"
          content="Welcome to GoWithGig - Atlanta's trusted choice for hassle-free rideshare car rentals. Discover flexible rental options tailored for gig drivers. Experience seamless bookings, top-notch vehicles, and dedicated support designed to fuel your driving success. Start your journey with us today!"
        />
      </Helmet>
      <CallUsBtn />
      <header className="header_home">
        <h1 className="h1_home">
          GoWith
          <span
            style={{
              color: "#f0b400",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            GIG
          </span>
        </h1>
        <h2 className="header_h2">
          Rent, Roll,{" "}
          <em className="text-decoration-underline">You're in Control</em>
        </h2>
        <p className="header_para header_para_home">
          At GoWithGIG, we provide Uber and Lyft drivers in the greater Atlanta
          area with the ultimate rideshare vehicle rental experience. Our fleet
          is tailored to meet the dynamic needs of gig drivers, offering the
          perfect blend of comfort, reliability, and style. Why choose
          GoWithGIG? It's simple:
          <div className="header_list">
            <li>
              <strong>Flexibility:</strong>{" "}
              <span>
                Pick the car that fits your style and schedule. With our
                flexible rental options, you're always in control.
              </span>
            </li>
            <li style={{ marginTop: "1rem" }}>
              <strong>Affordability:</strong>{" "}
              <span>
                Competitive rates that maximize your earnings. More miles, more
                money – with less worry.
              </span>
            </li>
            <li style={{ marginTop: "1rem" }}>
              <strong>Quality and Support:</strong>{" "}
              <span>
                Drive with confidence knowing you're backed by premium vehicles
                and our dedicated support team.
              </span>
            </li>
          </div>
          Whether you're just starting out or looking to upgrade your rideshare
          driving game, GoWithGIG is your go-to partner. Join our community of
          satisfied Uber and Lyft drivers in Atlanta and experience the
          difference of a rental service that truly understands your needs. Rent
          with us, take the wheel, and enjoy the journey to success!
        </p>
        <Button
          className="header_btn p-3 mt-4"
          variant="primary"
          onClick={() => navigate("/apply")}
        >
          Apply Now
        </Button>
      </header>
      <main className="main_home">
        {/* MAIN_1 */}
        {screenWidth < 1050 ? (
          <div className="row_1_home mt-5">
            <div className="gutter_left"></div>
            <div className="main_1_home_mobile">
              <Image
                className="img_main_home"
                src={driverImage}
                alt="driver_img"
                fluid
              />
              <div className="text_main_1_home mt-5">
                <h2>
                  Turn every mile into money! With{" "}
                  <span className="highlight_yellow">GoWithGIG</span> Rideshare
                  Rentals
                </h2>
                <p className="mt-4">
                  Unlock the potential of every drive in Atlanta with GoWithGIG.
                  Our top-quality vehicles are tailored for your rideshare
                  success, offering competitive rates and flexible rental terms.
                  Drive on your terms, enjoy hassle-free maintenance, and
                  transform every journey into profit. Join GoWithGIG today and
                  start a rewarding rideshare adventure!
                </p>
                <Button
                  className="header_btn p-3 m-3 mt-2"
                  variant="primary"
                  onClick={() => navigate("/apply")}
                >
                  Book Now
                </Button>
              </div>
            </div>
            <div className="gutter_right"></div>
          </div>
        ) : (
          <div className="row_1_home">
            <div className="gutter_left"></div>
            <div className="main_1_home_desktop">
              <Image
                className="img_main_home"
                src={driverImage}
                alt="driver_img"
                fluid
              />
              <div className="text_main_1_home transform">
                <h2>
                  Turn every mile into money! <br />
                  With <span className="highlight_yellow">GoWithGIG</span>{" "}
                  Rideshare Rentals
                </h2>
                <p className="mt-4">
                  Unlock the potential of every drive in Atlanta with GoWithGIG.
                  Our top-quality vehicles are tailored for your rideshare
                  success, offering competitive rates and flexible rental terms.
                  Drive on your terms, enjoy hassle-free maintenance, and
                  transform every journey into profit. Join GoWithGIG today and
                  start a rewarding rideshare adventure!
                </p>
                <Button
                  className="header_btn p-3 m-3 "
                  variant="primary"
                  onClick={() => navigate("/apply")}
                >
                  Book Now
                </Button>
              </div>
            </div>
            <div className="gutter_right"></div>
          </div>
        )}

        {/* MAIN_2 */}
        <div className="row_2_home">
          <div className="gutter_left"></div>
          <div className="main_2_home">
            <div className="main_2_home_title">
              <h2>
                Kickstart Earnings: Just{" "}
                <span className="highlight_green">4 Steps</span> Away!
              </h2>
            </div>
            <div className="main_2_home_content">
              <div
                className="my_card step select_step"
                onClick={() => navigate()}
              >
                <h3 className="step_title">Select Your Car</h3>
                <FontAwesomeIcon icon={faCar} size="4x" className="icon" />

                <p>
                  At GoWithGig, we offer an extensive range of high-quality
                  vehicles to suit your rideshare needs in Atlanta. Whether you
                  prefer a compact car for city driving or a larger vehicle for
                  extra comfort, our diverse fleet has the perfect match for
                  you. Each car is meticulously maintained to ensure safety,
                  comfort, and reliability, allowing you to choose with
                  confidence.
                </p>
              </div>
              <div
                className="my_card step apply_step"
                onClick={() => navigate()}
              >
                <h3 className="step_title">Apply</h3>
                <FontAwesomeIcon
                  icon={faClipboardUser}
                  size="4x"
                  className="icon"
                />
                <p>
                  Getting started with GoWithGig is simple and straightforward.
                  Fill out our online application form and provide the necessary
                  details. Our team will quickly process your application,
                  ensuring a smooth and hassle-free experience. We're committed
                  to helping you embark on your rideshare journey as quickly as
                  possible.
                </p>
              </div>
              <div
                className="my_card step book_step"
                onClick={() => navigate()}
              >
                <h3 className="step_title">Booking</h3>
                <FontAwesomeIcon
                  icon={faCreditCard}
                  size="4x"
                  className="icon"
                />
                <p>
                  Once approved, booking your preferred vehicle is just a few
                  clicks away. Our user-friendly platform allows you to choose
                  your car, set rental duration, and confirm your booking with
                  ease. We ensure transparency in every step, providing clear
                  information on pricing, terms, and conditions to help you make
                  an informed decision.
                </p>
              </div>
              <div
                className="my_card step earn_step"
                onClick={() => navigate()}
              >
                <h3 className="step_title">Start Earning</h3>
                <FontAwesomeIcon
                  icon={faSackDollar}
                  size="4x"
                  className="icon"
                />
                <p>
                  With your chosen vehicle ready, it's time to hit the road and
                  start earning! GoWithGig supports your drive towards success
                  in the gig economy. Enjoy the flexibility of being your own
                  boss, the convenience of our reliable vehicles, and the
                  assurance of our ongoing support. Let’s accelerate your
                  rideshare career together!
                </p>
              </div>
            </div>
          </div>
          <div className="gutter_right"></div>
        </div>

        {/* MAIN_3*/}
        <div className="row_3_home">
          <div className="gutter_left"></div>
          <div className="main_3_home">
            <div className="main_3_home_title">
              <h2>Select Styles Available: Car & SUV</h2>
            </div>
            <div className="main_3_home_content">
              <div className="my_card car">
                <h3>
                  <span className="year">2024</span> Chevrolet Malibu
                </h3>
                <Image
                  src={malibu}
                  alt="malibu_img"
                  fluid /*className="mb-4"*/
                />
                <div className="car_content mt-2">
                  <h4 className="car_price">
                    <strong>$43.99</strong> <span>/day</span>
                  </h4>
                  <h4 className="car_price mb-1">
                    <strong>$307.93</strong> <span>/week</span>
                  </h4>
                  <ul className="car_list fw-bold">
                    <li>Type: Sedan</li>
                    <li>Doors: 4-door</li>
                    <li>Color: Silver & White</li>
                    <li>Well Maintained</li>
                  </ul>
                  <Button
                    className="header_btn p-3 m-3 "
                    variant="primary"
                    onClick={() => navigate("/apply")}
                  >
                    Apply Now
                  </Button>
                  <small>*Excludes taxes & insurance</small>
                </div>
              </div>
              <div className="my_card car">
                <h3>
                  <span className="year">2021-22</span> Chevrolet Equinox
                </h3>
                <Image
                  src={equinox}
                  alt="equinox_img"
                  fluid /*className="mb-4"*/
                />
                <div className="car_content mt-2">
                  <h4 className="car_price">
                    <strong>$43.99</strong> <span>/day</span>
                  </h4>
                  <h4 className="car_price mb-1">
                    <strong>$307.93</strong> <span>/week</span>
                  </h4>
                  <ul className="car_list fw-bold">
                    <li>Type: Compact SUV</li>
                    <li>Doors: 4-door</li>
                    <li>Color: Silver, White, & Black</li>
                    <li>Well Maintained</li>
                  </ul>
                  <Button
                    className="header_btn p-3 m-3 mt-2"
                    variant="primary"
                    onClick={() => navigate("/apply")}
                  >
                    Apply Now
                  </Button>
                  <small>*Excludes taxes & insurance</small>
                </div>
              </div>
            </div>
          </div>
          <div className="gutter_right"></div>
        </div>

        {/* MAIN_4 */}
        <div className="row_4_home">
          <div className="main_4_home">
            <div className="main_4_home_content ">
              <div className="img_main_4_home ">
                <Image
                  className="service_img"
                  src={serviceImage}
                  alt="service_img"
                  fluid
                />
              </div>
              <div className="text_main_4_home">
                <h2>
                  Quality Rides, Exceptional Care: Your Journey, Our Commitment
                </h2>
                <p className="mt-4 service_para">
                  At GoWithGig, we prioritize your driving experience. Our fleet
                  features top-quality, well-maintained vehicles to ensure a
                  smooth, comfortable journey every time. We're dedicated to
                  providing exceptional care, with a focus on customer
                  satisfaction and safety, ensuring a reliable and enjoyable
                  driving experience for our Atlanta rideshare community.
                </p>
                <div className="service_grid">
                  <div className="service_box">
                    <div className="service_box_left">
                      <FontAwesomeIcon
                        icon={faHandHoldingDollar}
                        size="4x"
                        className="icon service_icon"
                      />
                    </div>
                    <div className="service_box_right">
                      <h3>Competitive Rate</h3>
                      <p>
                        Experience the most competitive rates in Atlanta's
                        rideshare rental market with GoWithGig. We offer
                        transparent pricing with no hidden fees, ensuring you
                        get the best value for your money. Our flexible rental
                        plans are designed to maximize your earnings and support
                        your success in the gig economy.
                      </p>
                    </div>
                  </div>
                  <div className="service_box">
                    <div className="service_box_left">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size="4x"
                        className="icon service_icon"
                      />
                    </div>
                    <div className="service_box_right">
                      <h3>Reliable Rental Service</h3>
                      <p>
                        GoWithGig stands for reliability. Our rental service is
                        streamlined to get you on the road quickly and
                        efficiently. With a wide range of well-maintained
                        vehicles, 24/7 customer service, and flexible rental
                        options, we ensure that your rideshare driving business
                        never hits a bump.
                      </p>
                    </div>
                  </div>

                  <div className="service_box">
                    <div className="service_box_left">
                      <FontAwesomeIcon
                        icon={faHeadset}
                        size="4x"
                        className="icon service_icon"
                      />
                    </div>
                    <div className="service_box_right">
                      <h3>Direct Support</h3>
                      <p>
                        Our dedicated support team at GoWithGig is always just a
                        call or a click away. We provide personalized, direct
                        support to address all your queries and concerns. From
                        rental agreements to vehicle maintenance, we ensure you
                        receive the assistance you need to keep your rideshare
                        business running smoothly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MAIN 5 */}
        <div className="row_5_home">
          <div className="gutter_left"></div>
          <div className="main_5_home pt-5">
            <h2 className="mb-5">Frequently Asked</h2>

            {/* 2 3-item grid Accordions, one right after the other, then side-by-side */}
            {/* When they're side-by-side, they'll need to be encompassed inside a common parent grid container.  */}
            {/* also, whenever one is clicked in one of the Accordions, a function will need to be run to close all potentially-expanded <Accordion.Item/>'s in the other  */}

            <div className="faq_grid_container">
              <Accordion
                activeKey={activeItems}
                onSelect={(newActiveItems) =>
                  setActiveItems(newActiveItems || [])
                }
                className="faq_grid faq_grid_1"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {activeItems.includes("0") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("0") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("0") ? "active" : ""
                        }`}
                      />
                    )}
                    What is required to rent?
                  </Accordion.Header>
                  <Accordion.Body>
                    Qualifications to Rent a Vehicle from GoWithGIG:{" "}
                    <li>
                      {" "}
                      Link account to Argyle (this is how we verify you are an
                      ACTIVE Gig Driver)
                    </li>{" "}
                    <li>
                      {" "}
                      Be a driver with gig companies such as Uber, Lyft,
                      DoorDash, Grub hub, Instacart, etc.
                    </li>{" "}
                    <li>
                      {" "}
                      Renter/driver needs to be at least 25 years old
                    </li>{" "}
                    <li> Have a valid driver’s license</li>{" "}
                    <li>
                      Be able to pay with a credit, debit, or pre-paid credit
                      card in the renter’s/driver’s name. Do all of these
                      describe you? What companies do you drive for?
                    </li>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {activeItems.includes("1") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("1") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("1") ? "active" : ""
                        }`}
                      />
                    )}
                    What are your rates?
                  </Accordion.Header>
                  <Accordion.Body>
                    <li>$75.00 Daily all inclusive</li>
                    <li>$375 - $450.00 Weekly all inclusive</li>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    {activeItems.includes("2") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("2") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("2") ? "active" : ""
                        }`}
                      />
                    )}
                    How much is the security deposit?
                  </Accordion.Header>
                  <Accordion.Body>
                    $150 refundable security deposit. As long as the vehicle is
                    returned undamaged, full of fuel and clean inside and out
                    you will receive your full deposit back.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                  <Accordion.Header>
                    {activeItems.includes("8") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("8") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("8") ? "active" : ""
                        }`}
                      />
                    )}
                    How do I extend if I want to keep the rental?
                  </Accordion.Header>
                  <Accordion.Body>
                    Customers receive an automated message on the day when the
                    rental is due it gives you the option to extend or return
                    the vehicle.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                  <Accordion.Header>
                    {activeItems.includes("7") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("7") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("7") ? "active" : ""
                        }`}
                      />
                    )}
                    Do I have to pay for the Oil Change?
                  </Accordion.Header>
                  <Accordion.Body>
                    We service our vehicles every 28 days, or 3000 miles, at no
                    cost to you.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion
                className="faq_grid faq_grid_2"
                activeKey={activeItems}
                onSelect={(newActiveItems) =>
                  setActiveItems(newActiveItems || [])
                }
              >
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    {activeItems.includes("3") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("3") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("3") ? "active" : ""
                        }`}
                      />
                    )}
                    What type of vehicles do you have available?
                  </Accordion.Header>
                  <Accordion.Body>
                    AT this time we have available 2020-2022 Chevrolet
                    Equinoxes, and Brand New 2024 Chevrolet Malibus
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    {activeItems.includes("4") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("4") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("4") ? "active" : ""
                        }`}
                      />
                    )}
                    What is Argyle?
                  </Accordion.Header>
                  <Accordion.Body>
                    This is how we verify you are an ACTIVE GIG DRIVER, which
                    means you are currently using it.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    {activeItems.includes("5") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("5") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("5") ? "active" : ""
                        }`}
                      />
                    )}
                    Can I use my own insurance?
                  </Accordion.Header>
                  <Accordion.Body>
                    We have our own insurance for $20/day that is automatically
                    placed on all of our vehicles during your rental regardless
                    of you having your own or not.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                    {activeItems.includes("6") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("5") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("5") ? "active" : ""
                        }`}
                      />
                    )}
                    What's the payment method?
                  </Accordion.Header>
                  <Accordion.Body>
                    We accept all major Credit, debit or pre-paid cards in the
                    renter’s/driver’s name.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9">
                  <Accordion.Header>
                    {activeItems.includes("9") ? (
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        size="2x"
                        className={`icon accordion_icon rotate-minus ${
                          activeItems.includes("9") ? "active" : ""
                        }`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        size="2x"
                        className={`icon accordion_icon rotate-plus ${
                          activeItems.includes("9") ? "active" : ""
                        }`}
                      />
                    )}
                    How do I get the vehicle I want or make sure a vehicle will
                    be there for me when I pick-up?
                  </Accordion.Header>
                  <Accordion.Body>
                    To help ensure you get the car you want, we encourage you to
                    pay for at least a minimum of 3 days + taxes/fees in advance
                    before pick-up. Your $150 security deposit can be paid in
                    advance or at time of pick-up. What day and time can I
                    schedule your pick-up for?
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <h3 className="mt-5 mb-4">Still have questions?</h3>
            <Button
              className="header_btn p-3 m-3 mt-2"
              variant="primary"
              onClick={() => navigate("/contact-us")}
            >
              Contact Us
            </Button>
          </div>
          <div className="gutter_right"></div>
        </div>
        <div className="row_6_home">
          <div className="gutter_left"></div>
          <div className="main_6_home">
            <h2>Locations</h2>
            <div className="locations_container">
              <div className="location location_atlanta">
                <img
                  className="img_location"
                  src={atlanta_svg}
                  alt="atlanta_img"
                />
                <h3 className="mt-4 mb-4">ATLANTA</h3>
                <p>
                  Located in the heart of Douglasville, our Atlanta branch is
                  perfectly positioned to serve the bustling city's rideshare
                  drivers. We offer a wide range of top-quality vehicles suited
                  for the diverse needs of Atlanta's gig economy. For
                  personalized service and inquiries, give us a call or visit us
                  and start your journey with GoWithGIG today!
                </p>
              </div>
              <div className="location location_chicago">
                <img
                  className="img_location"
                  src={chicago_svg}
                  alt="chicago_img"
                />
                <h3 className="mt-4 mb-4">CHICAGO</h3>
                <p>
                  Exciting news for Uber and Lyft drivers in the Windy City!
                  GoWithGIG is soon opening a new location in Chicago. Stay
                  tuned for our grand opening, where we'll bring our renowned
                  rideshare rental services to even more gig drivers. Get ready,
                  Chicago - your rideshare driving experience is about to get an
                  upgrade with GoWithGIG!
                </p>
              </div>
            </div>
          </div>
          <div className="gutter_right"></div>
        </div>
      </main>
    </div>
  );
};

export default Home;
