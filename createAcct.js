// export default CreateAcct;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import logo from "../icons/logoClean.webp";

const CreateAcct = () => {
  // State to store the uuid
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setUuid(queryParams.get("uuid"));
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  console.log(uuid);

  const handleSubmit = async (event) => {
    console.log("heandle submit activated");

    event.preventDefault();
    setErrorMessage(null);

    const userCredentials = {
      username,
      password,
      uuid,
    };

    console.log(userCredentials);
    try {
      const response = await axios.post(
        "https://dev-react.holmesmotors.com/api/myaccount/creation",
        userCredentials
      );
      if (response.data.success) {
        console.log("user credentials validated");
        // const token = response.data.token;
        // const userData = response.data.user; //rec'd 'application object reponse

        navigate("/"); // Just redirect customer to login
      } else {
        console.log("user credentials NOT validated", response.data.message);
        setErrorMessage(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login request:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="page_content">
      <main className="login_main">
        <div className="row_1_login">
          <div className="gutter_left"></div>
          <div className="login_main_row_1">
            <Image className="logo_footer" src={logo} alt="logo" />
            <div className="login_box">
              <h2 style={{ textAlign: "center" }}>
                Create Your <span>Account</span> Below
              </h2>
              <form onSubmit={handleSubmit}>
                <span>
                  <h2>
                    UUID from URL: <span>{uuid}</span>
                  </h2>
                </span>

                <div className="label_box">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div className="label_box">
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
                    CREATE ACCOUNT NOW!
                  </Button>
                </div>
              </form>
              {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
            </div>
          </div>
          <div className="gutter_right"></div>
        </div>
      </main>
    </div>
  );
};

export default CreateAcct;
