import React from "react";
import TOS from "../pages/TOS";
import PrivPol from "../pages/PrivPol";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p style={{ marginBottom: "0px" }}>
        <svg
          version="1.2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 847 847"
          width="17"
          height="17"
          fill="rgba(255, 255, 255, 0.5)"
        >
          <g id="Layer">
            <path
              id="Layer"
              fillRule="evenodd"
              className="s0"
              d="m423.3 12.2c227.1 0 411.1 184.1 411.1 411.1 0 227.1-184 411.1-411.1 411.1-227 0-411.1-184-411.1-411.1 0-227 184.1-411.1 411.1-411.1zm-302.3 411.1c0 167 135.3 302.4 302.3 302.4 167 0 302.4-135.4 302.4-302.4 0-167-135.4-302.3-302.4-302.3-167 0-302.3 135.3-302.3 302.3zm302.3-212c49.9 0 95.8 17.2 132 46.1 10.2 8 11 23 1.8 32.1l-41.8 41.9c-7.5 7.5-19.2 8.5-27.8 2.3-18.1-13-40.3-20.6-64.2-20.6-60.9 0-110.2 49.3-110.2 110.2 0 60.9 49.3 110.3 110.2 110.3 23.9 0 46.1-7.7 64.2-20.6 8.6-6.2 20.3-5.2 27.8 2.3l41.8 41.8c9.2 9.2 8.4 24.1-1.8 32.2-36.2 28.8-82.1 46.1-132 46.1-117.1 0-212-95-212-212.1 0-117.1 94.9-212 212-212z"
            />
          </g>
        </svg>
        GoWithGIG, {currentYear}
      </p>
      {/* <a onClick={() => navigate("/terms-of-service")} href={TOS}>
        Terms of Service
      </a>
      <a onClick={() => navigate("/privacy-policy")} href={PrivPol}>
        Privacy Policy
      </a> */}
      <a
        onClick={() => {
          window.open("/terms-of-service", "_blank");
          // navigate("/terms-of-service");
        }}
        href={TOS}
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </a>
      <a
        onClick={() => {
          window.open("/privacy-policy", "_blank");
          // navigate("/privacy-policy");
        }}
        href={PrivPol}
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
