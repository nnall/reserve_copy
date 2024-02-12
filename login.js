import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import videoBG from "./video/bgVideo2.mp4";
import axios from "axios";
import { loginSuccess, loginFailure } from "../redux/actions";
import { connect, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import logo from "../icons/logoClean.webp";

import Footer from "../components/footer";

function LogIn({ dispatch }) {
  /////// AT THE TIME OF LOGIN THE REDUX STORE IS EMPTY SINCE NO ONE HAS LOGGED IN. WHICH MEANS NO CUSTOMER DATA.

  //GETTING ACCT OBJ FROM REDUX STORE
  //   const user = useSelector((state) => state.user);
  // Accessing the user object from the Redux store
  //   const firstName = user ? user.first_name : "Guest";
  // Extracting the first name from the user object

  /// YOU DON'T NEED ANY INFO FROM THE CREATEACCT PAGE
  // THE REASON IS THAT WHEN SOMEONE LOGINS IN WE LOOK THEM UP.
  // WE DON'T WANT TO BE PASSING USERNAMES AND PASSWORD AROUND

  //GETTING THE STATE OBJECT FROM CREATEACCT
  //   const location = useLocation();
  //   const userData = location.state && location.state.userData;
  //   console.log(`Login userData state obj, orig rec'd in CreateAcct ${userData}`);

  //userData state was not passed from CreateAcct, its NULL

  // LOGIN FORM DATA FOR  BACKEND
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    console.log("handleSubmit activated");
    event.preventDefault();
    setErrorMessage(null);

    const userCredentials = {
      username,
      password,
    };
    try {
      const response = await axios.post(
        "https://dev-react.holmesmotors.com/api/myaccount/login",
        userCredentials
      );
      if (response.data.success) {
        console.log("axios.post call successful");
        const token = response.data.token;
        const userData = response.data.user;

        // This dispatch is setting the userdata in the state.
        dispatch(loginSuccess({ user: userData, token: token }));
        localStorage.setItem("token", token);
        /// Set timeout: this makes sure that all states and process are done before navigate
        setTimeout(() => navigate("/portal"), 0);

        ///////// YOU DON'T HAVE TO SEND THE STATE TO THE NEXT COMPONENT. THE STATE PERSIST ACCROSS EVERYTHING UNTIL THEY LOG OUT
        //navigate("/portal", { state: { userData } }); //send userData to /portal
      } else {
        console.log("axios.post call NOT successful");
        setErrorMessage(response.data.message || "Login failed.");
        dispatch(loginFailure(response.data.message || "Login failed."));
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      dispatch(loginFailure("Login failed"));
    }
    // Clearing the username and password fields
    setUsername("");
    setPassword("");
  };

  return (
    <div className="page_content">
      <main className="login_main">
        <video src={videoBG} autoPlay muted loop></video>
        <div className="row_1_login">
          <div className="gutter_left"></div>
          <div className="login_main_row_1">
            <Image className="logo_footer" src={logo} alt="logo" />
            <div className="login_box">
              {/* YOU DON'T KNOW WHO IS TRYING TO LOGIN, NO NEED FOR WELCOME FIRSTNAME */}
              {/* <h1>Welcome {firstName}</h1> */}

              <h2 style={{ textAlign: "center" }}>
                Please <span>Login</span>
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="label_box">
                  {/* <label htmlFor="username">Username</label> */}
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div className="label_box">
                  {/* <label htmlFor="password">Password</label> */}
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button className="btn-primary-portal" type="submit">
                    Login
                  </Button>
                </div>
              </form>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <Footer />
          </div>
          <div className="gutter_right"></div>
        </div>
      </main>
    </div>
  );
}

export default connect()(LogIn);
