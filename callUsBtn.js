import React from "react";
// import "./CallUsButton.css"; // Import the CSS file for styling if needed
import { SlEarphonesAlt } from "react-icons/sl";
import Button from "react-bootstrap/Button";

const CallUsBtn = () => {
  // This function will be used to initiate the call or any other action you want
  const handleCallNow = () => {
    // Implement your call logic here
    //alert("Calling now!");
  };

  return (
    <Button
      className="call-us-button"
      onClick={handleCallNow}
      // style={{ marginRight: ".5rem", border: "3px solid transparent" }}
    >
      <SlEarphonesAlt style={{ marginRight: ".5rem" }} />{" "}
      <a href="tel:+18448207433" style={{ color: "white" }}>
        <span className="animated-text">Call Us Now!</span>
      </a>
    </Button>
  );
};

export default CallUsBtn;
