import React, { useEffect } from "react";

import { Helmet } from "react-helmet";

///////  REACT-BOOTSTRAP STYLING ///////////
import "bootstrap/dist/css/bootstrap.min.css";

//CALL US BUTTON
import CallUsBtn from "./callUsBtn.js";

//IMAGES
import aboutUsImg from "../images/aboutUs_img_cropped2.webp";
// import aboutUsImg2 from "../images/aboutUs_img_cropped2.png";

const AboutUs = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="page_content">
      <Helmet>
        <title>
          About GoWithGig: Your Atlanta Rideshare Rental Partner | Our Story &
          Mission
        </title>
        <meta
          name="description"
          content="Discover the story behind GoWithGig, Atlanta's leading rideshare car rental service. Learn about our mission to empower gig drivers with flexible, reliable, and affordable vehicle solutions. Committed to driving your success. Meet the team dedicated to enhancing your gig driving experience!"
        />
      </Helmet>
      <CallUsBtn />
      <main>
        <div className="row_1_aboutUs">
          <div className="main_1_aboutUs ">
            <h1 className="aboutUs_title">
              {" "}
              At <span className="highlight_yellow">GoWithGIG</span>, we're more
              than just a rental service - we're your{" "}
              <span className="highlight_yellow">trusted travel companion</span>
            </h1>

            <div className="img_para_box">
              <p className="aboutUs_para ">
                With over 35 years of combined experience in the automobile
                industry, GoWithGig is a testament to our deep-rooted expertise
                and commitment to car dealership excellence and customer
                satisfaction. Our foundation is built on a profound passion for
                vehicles and a keen understanding of the critical role of
                reliable transportation for those in the gig economy. Our
                leadership, seasoned in the car business, has not only achieved
                remarkable success but also fostered a culture of customer
                centricity and fairness. At GoWithGig, we recognize the unique
                demands of gig drivers. Our cars are more than just vehicles;
                they are your workspace, your livelihood, and a reflection of
                your identity. Our mission is to deliver the highest quality,
                most dependable vehicles to ensure your work flows
                uninterrupted. We are dedicated to a hands-on approach in
                customer service, prioritizing your needs at every step. From
                your initial interaction with us to continual support, our goal
                is to make your experience as smooth as possible. We do more
                than just rent cars - we forge partnerships and nurture
                relationships grounded in mutual respect and understanding. We
                understand the importance of value for our customers. Leveraging
                our extensive industry experience, we negotiate the best deals,
                offering you top-quality vehicles at highly competitive prices.
                Driven by principles of integrity and respect, GoWithGig is more
                than a company - it's a community. Our aim is to empower gig
                drivers with the right tools, giving you the freedom to work
                effectively and the confidence in our steadfast support. Join
                our journey. Choose GoWithGig, where quality converges with
                reliability, and service surpasses expectations. Together, we
                drive towards a future where every gig driver is equipped for
                success.
              </p>
              <div className="aboutUs_img_wrapper">
                <img
                  src={aboutUsImg}
                  className="aboutUs_img "
                  alt="woman sitting on a car looking into sunset"
                />
              </div>
            </div>
          </div>
          {/* <div className="gutter_right"></div> */}
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
