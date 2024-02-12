import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as ReactDOM from 'react-dom';

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

////// ICONS (FontAwesome package) /////
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, icon } from "@fortawesome/fontawesome-svg-core";

///////  REACT-BOOTSTRAP STYLING ///////////
import "bootstrap/dist/css/bootstrap.min.css";

//IMAGES
import aboutUsImg from "../images/aboutUs_img_cropped.webp";
// import aboutUsImg2 from "../images/aboutUs_img_cropped2.png";



const UserDashboard = () => {

     
  return (
    <div className="page_content">
      <header className="header_dashboard">
        <h1 className="h1_dashboard"> Dashboard</h1>
        <h2 className="header_h2">Successful submission.</h2>
        <p className="header_para header_para_home">
        <div className="component UserApp\">

      <h3 className="loginHeader">USER DASHBOARD  </h3>

      <div className="loginBox ">
        <h4 className="p-4">This is going to be where all of your reservations and payments can be viewed.</h4>
       
          <Button className="p-3" variant="primary mt-5" type="submit">
            Logout
          </Button>
         
      </div>
    </div>
        </p>
      </header>
      <main>
        <div className="row_1_dashboard ">
          {/* <div className="gutter_left"></div> */}
          <div className="main_1_dashboard clearfix">
            {/* <div className="dashboard_text"> */}
            <h2 className="dashboard_title">
              {" "}
              Hello There!<span className="highlight_yellow">You Made it to the next level. </span> KEEP BEING{" "}
              <span className="highlight_yellow">AWESOME</span>
            </h2>

            <p className="aboutUs_para ">
              Lorem Ipsum blah blah blah
            </p>
            
            {/* </div> */}
            {/* <div className="aboutUs_imageContainer"> */}
            {/* <Image
              src={aboutUsImg}
              alt="wistful_woman_img"
              className="aboutUs_img"
            /> */}

            {/* </div> */}
          </div>
          {/* <div className="gutter_right"></div> */}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
