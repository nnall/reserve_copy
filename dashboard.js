import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as ReactDOM from "react-dom";
import { Helmet } from 'react-helmet';
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

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  localStorage.clear();
  console.log(localStorage);

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

  /******** HANDLE SUBMIT() *********/
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("handleSubmit was activated");

    // Resetting the error message on each submit
    setErrorMessage(null);

    const userCredentials = {
      firstname,
      lastname,
      username,
      password,
    };

    console.log(userCredentials);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user",
        userCredentials
      );

      //

      if (response.data.success) {
        // console.log("Apply was a success");
        console.log("login was a success");
        <div>{firstname}</div>;

        navigate("/user");
      } else {
        setErrorMessage(response.data.message || "Apply failed.");
        console.log(response);
      }
    } catch (error) {
      console.error("There was an error sending the request:", error);
      setErrorMessage("There was an error sending the request.");
    }

    // Reset the form

    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  return (
    <div className="page_content page_content_dashboard">
      <Helmet>
      <title>Thank You For Your Application</title>
      <meta name="description" content="Thank you for choosing GoWithGig, Atlanta's premier rideshare car rental service! Your application is now pending. Please await an essential email from Argyle to link your gig account, advancing our seamless approval process. We're excited to get you on the road soon!" />
    </Helmet>
      <main className="dashboard_main">
        <div className="row_1_dashboard ">
          {/* <div className="gutter_left"></div> */}
          <div className="main_1_dashboard">
            {/* <div className="dashboard_text"> */}
            <h2 className="dashboard_title mb-0">
              Hello There! <br />
              <span className="highlight_yellow">
                You Made it to the next level! <br />
              </span>
              KEEP BEING <span className="highlight_yellow">AWESOME</span>
            </h2>

            <p className="mb-3 fw-bold">Your application is currently awaiting approval. Shortly, you will receive a message from Argyle. This message is an important step in finalizing your application process.
              To proceed, please follow the instructions in Argyle's message to link your gig account. This connection is essential for us to complete the approval of your application.
              We appreciate your prompt attention to this final step. Rest assured, we'll be in touch with you soon as we finalize everything on our end.</p>
              <h4 className="fw-bold">Thank you for choosing to work with us!</h4>
            <Button onClick={() => navigate("/")}>back to Home</Button>
          </div>
          {/* <div className="gutter_right"></div> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
