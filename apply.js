import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

///// ARGYLE STUFF
import axios from "axios";
import ArgyleComponent from "./argyle";
//////////// REACT-ICONS //////////
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

//////////// REACT-BOOTSTRAP COMPONENTS //////////
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

//////////// DOB datepicker //////////
// import { InputMask } from "primereact/inputmask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaskedInput from "react-text-mask";

import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";

import CallUsBtn from "./callUsBtn";

function ApplyApp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [time_in_area_years, setTimeInAreaYears] = useState("");
  const [time_in_area_months, setTimeInAreaMonths] = useState("");
  const [time_in_area, setTimeInArea] = useState("");
  const [lead_source, setLeadSource] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [dob, setDob] = useState(null);
  const [showSSN, setShowSSN] = useState(false);
  const [ssn, setSSN] = useState("");
  const [dl, setDL] = useState("");
  const [dlState, setDlState] = useState("");
  const [gigEmp, setGigEmp] = useState("");
  const [smsText, setSmsText] = useState(false);

  const [showDL, setShowDL] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  // Retrieve GCLID
  const gclid = sessionStorage.getItem("gclid");
  // On submit loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  localStorage.clear();
  //console.log(localStorage);

  const formatPhoneNumber = (input) => {
    // Remove non-numeric characters
    const cleaned = input.replace(/\D/g, "");

    // Check if the input is empty or non-numeric
    if (!cleaned || isNaN(cleaned)) {
      return "";
    }

    // Format the phone number
    const areaCode = cleaned.slice(0, 3);
    const firstPart = cleaned.slice(3, 6);
    const secondPart = cleaned.slice(6, 10);

    let formattedNumber = "";

    // Add area code
    if (areaCode) {
      formattedNumber += `(${areaCode}`;
    }

    // Add first part
    if (firstPart) {
      formattedNumber += `)${firstPart}`;
    }

    // Add second part
    if (secondPart) {
      formattedNumber += `-${secondPart}`;
    }

    return formattedNumber;
  };

  // Send lead to simpsocial
  const sendAdditionalAPICall = async (userCredentials) => {
    try {
      const response = await axios.post(
        "https://api.gowithgig.com/api/send/lead",
        userCredentials
      );
      return response.data;
    } catch (error) {
      console.error("Error in additional API call:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  //PHONE FORMATTING
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setPhone(formattedValue);
  };

  const stateNames = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  //TIME IN AREA
  const yearsNumbers = [0, 1, 2, 3, 4, "5+"];
  const monthsNumbers = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11];
  //TIME IN AREA CONCATENATION
  const updateTimeInArea = () => {
    const concatenatedTimeInArea = `${time_in_area_years} years, ${time_in_area_months} months`;
    setTimeInArea(concatenatedTimeInArea);
    //console.log(time_in_area);
  };

  //LEAD SOURCE
  const leadSources = [
    "Facebook",
    "Instagram",
    "X",
    "Television Ad",
    "Google Ad",
    "Personal Research",
  ];

  //Toggle  Bday Hide Btn
  const toggleShowDate = () => {
    setShowDate(!showDate);
  };

  const toggleShowSSN = () => {
    setShowSSN(!showSSN);
  };

  const toggleShowDL = () => {
    setShowDL(!showDL);
  };

  //DATEPICKER
  const autoCorrectedDatePipe = createAutoCorrectedDatePipe("mm/dd/yyyy HH:MM");

  let normalDate;

  const handleDate = (e) => {
    normalDate = e === null ? "" : normalDateFormatted(e);
    // //console.log(normalDate);
    setDob(normalDate);
  };

  const handleAddressChange = () => {
    const newhandleAddressChange = `${street}, ${city}, ${state}, ${zip}`;
    setAddress(newhandleAddressChange);
  };

  const normalDateFormatted = (d) => {
    if (d) {
      return (
        Number(d.getMonth() + 1) +
        "/" +
        ("0" + d.getDate()).slice(-2) +
        "/" +
        d.getFullYear()
      );
    }
  };

  //SOCIAL SECURITY NUMBER MASK

  const handleSSN = (e) => {
    const inputSSN = e.target.value.replace(/\D/g, "");

    // Format the SSN as "###-##-####"
    const formattedSSN = inputSSN.replace(
      /^(\d{3})(\d{2})(\d{4})$/,
      "$1-$2-$3"
    );

    setSSN(formattedSSN);
    return formattedSSN;
  };

  // Email Handler
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!validateEmail(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // GIG EMP HANDLER

  const handleGigEmpChange = (value, checked) => {
    setGigEmp((prevGigEmp) =>
      checked
        ? prevGigEmp !== ""
          ? prevGigEmp.split(",").includes(value)
            ? prevGigEmp
            : prevGigEmp + "," + value
          : value
        : prevGigEmp
            .split(",")
            .filter((item) => item !== value)
            .join(",")
    );
  };

  const gigEmployers = ["Lyft", "Uber"];

  /******** HANDLE SUBMIT() *********/
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    ////console.log("handleSubmit was activated");

    // Resetting the error message on each submit
    setErrorMessage(null);

    const userCredentials = {
      // username,
      // password,
      firstname,
      lastname,
      email,
      phone,
      street,
      city,
      state,
      zip,
      address,
      time_in_area_years,
      time_in_area_months,
      time_in_area,
      lead_source,
      dob,
      ssn,
      dl,
      dlState,
      gigEmp,
      smsText,
      gclid: gclid || "0",
    };

    //Browser Form verification ('this form is required)
    if (
      // !username ||
      // !password ||
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !zip ||
      !address ||
      !time_in_area_years ||
      !time_in_area_months ||
      !time_in_area ||
      !lead_source ||
      !dob ||
      !ssn ||
      !dl ||
      !dlState ||
      !gigEmp ||
      !smsText
    ) {
      setSubmitted(true);
      //console.log("one of the fields was left unanswered");
      //console.log(userCredentials);
      // Additional logic for handling required fields that weren't filled out
    } else {
      setSubmitted(false);
      // Continue with your form submission logic
    }

    try {
      console.log(userCredentials);
      // Check if any of the properties in userCredentials is falsy
      const hasEmptyField = Object.values(userCredentials).some(
        (value, key) => !value && key !== "gclid" // Exclude gclid from the empty field check
      );

      if (hasEmptyField) {
        setErrorMessage("Please fill out all required fields.");
      } else {
        // All fields have values, proceed with the API call
        console.log(gclid);
        const response = await axios.post(
          "https://dev-react.holmesmotors.com/api/apply",
          userCredentials
        );

        if (response.data.success) {
          const additionalResponse = await sendAdditionalAPICall(
            userCredentials
          );
          navigate("/thank-you"); // GO TO DASHBOARD
        } else {
          setErrorMessage(response.data.message || "Apply failed.");
          //console.log(response);
        }
      }
    } catch (error) {
      console.error("There was an error sending the request:", error);
      setErrorMessage("There was an error sending the request.");
    }

    try {
      return <ArgyleComponent userCredentials={userCredentials} />;
    } catch (error) {
      console.error("There was an error sending the request:", error);
      setErrorMessage("There was an error sending the request.");
    }

    // Reset the form
    // setUsername("");
    // setPassword("");
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhone("");
    setStreet("");
    setCity("");
    setState("");
    setZip("");
    setAddress("");
    setTimeInAreaYears("");
    setTimeInAreaMonths("");
    setTimeInArea("");
    setLeadSource("");
    setDob("");
    setSSN("");
    setShowDL("");
    setDlState("");
    setGigEmp("");
    setSmsText(false);

    //
    // setIncomplete(true);
    // setSubmitted(false);
    // }
  };

  /////////////////////////////////////////////

  return (
    // <body>
    <div className="page_content">
      <Helmet>
        <title>
          Apply Now for Rideshare Rentals | GoWithGig Atlanta – Get Started
          Today!
        </title>
        <meta
          name="description"
          content="Join the GoWithGig family in Atlanta! Start your application for a flexible and reliable rideshare car rental. Quick, easy process with competitive rates and support. Apply today and accelerate your gig driving career!"
        />
      </Helmet>

      <header className="header_apply">
        <h1 className="h1_apply">
          Gig-Ready{" "}
          <span
            style={{
              color: "#f0b400",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Rides
          </span>
        </h1>
        <h2 className="header_h2">Your Perfect Car Awaits!</h2>
        <p className="header_para header_para_apply">
          Are you a carshare driver looking for a new office? <br /> You are in
          the right place to get started. Start your application below to get
          approved with GoWithGig.
        </p>
      </header>
      <main className="main_apply">
        <CallUsBtn />
        <div className="row_1_apply mt-5">
          <div className="gutter_left"></div>
          <div className="component applyApp">
            <div className="applyBox ">
              <h2 className="mb-4">Please Apply</h2>
              <Form onSubmit={handleSubmit} noValidate>
                <fieldset>
                  <legend>
                    <h3 className="mb-2">Your Personal Info</h3>
                  </legend>
                  <Form.Group className="mb-2">
                    <Form.Label id="firstnameLabel">First Name</Form.Label>
                    <Form.Control
                      required
                      aria-labelledby="firstnameLabel"
                      type="text"
                      style={{ fontSize: "20px" }}
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    {submitted && !firstname && (
                      <Form.Text className="text-muted">
                        This field is required.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label id="lastnameLabel">Last Name</Form.Label>
                    <Form.Control
                      required
                      aria-labelledby="lastnameLabel"
                      type="text"
                      style={{ fontSize: "20px" }}
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    {submitted && !lastname && (
                      <Form.Text className="text-muted">
                        This field is required.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label id="emailLabel">Email</Form.Label>
                    <Form.Control
                      required
                      autocomplete="off"
                      aria-labelledby="emailLabel"
                      type="email"
                      style={{ fontSize: "20px" }}
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {submitted && !email && (
                      <Form.Text className="text-muted">
                        This field is required.
                      </Form.Text>
                    )}
                    {emailError && (
                      <Form.Text className="text-danger">
                        {emailError}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-2 ">
                    <Form.Label id="phoneLabel">Phone</Form.Label>
                    <Form.Control
                      required
                      autocomplete="off"
                      aria-labelledby="phoneLabel"
                      type="text"
                      style={{ fontSize: "20px" }}
                      value={phone}
                      onChange={handlePhoneChange} //<-- formats & updates 'phone'
                      placeholder="(   )    -    "
                    />
                    {submitted && !phone && (
                      <Form.Text className="text-muted">
                        This field is required.
                      </Form.Text>
                    )}
                  </Form.Group>
                  {/* ADDRESS */}
                  <fieldset>
                    <legend id="addressLegend">Address</legend>
                    <Form.Group className="mb-2 ">
                      <Form.Control
                        required
                        id="street"
                        aria-labelledby="addressLegend"
                        alt="street"
                        // className="mb-2"
                        type="text"
                        style={{ fontSize: "20px" }}
                        placeholder="Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        onBlur={handleAddressChange}
                      />
                      {submitted && !street && (
                        <Form.Text className="text-muted">
                          This field is required.
                        </Form.Text>
                      )}
                      <Form.Control
                        required
                        id="city"
                        aria-labelledby="addressLegend"
                        className="mt-2"
                        alt="city"
                        type="text"
                        style={{ fontSize: "20px" }}
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onBlur={handleAddressChange}
                      />
                      {submitted && !city && (
                        <Form.Text className="text-muted">
                          This field is required.
                        </Form.Text>
                      )}
                      <Form.Control
                        required
                        id="state"
                        aria-labelledby="addressLegend"
                        className="mt-2"
                        as="select"
                        alt="state"
                        type="text"
                        style={{ fontSize: "20px" }}
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        onBlur={handleAddressChange}
                      >
                        <option value="" disabled>
                          Select State
                        </option>

                        {stateNames.map((stateName, index) => (
                          <option key={index} value={stateName}>
                            {stateName}
                          </option>
                        ))}
                      </Form.Control>
                      {submitted && !state && (
                        <Form.Text className="text-muted">
                          This field is required.
                        </Form.Text>
                      )}
                      <Form.Control
                        required
                        id="zip"
                        aria-labelledby="addressLegend"
                        className="mt-2"
                        type="text"
                        maxLength={5}
                        alt="zip"
                        style={{ fontSize: "20px" }}
                        placeholder="Zip Code"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        onBlur={handleAddressChange}
                      />
                      {submitted && !zip && (
                        <Form.Text className="text-muted">
                          This field is required.
                        </Form.Text>
                      )}
                    </Form.Group>
                  </fieldset>
                </fieldset>

                {/******************** Birthday *******************/}

                <Form.Group className="mb-2">
                  <Form.Label id="birthdayLabel">Date of Birth</Form.Label>
                  <div className="birthday_wrapper">
                    <DatePicker
                      required
                      name="birthdayLabel"
                      aria-labelledby="birthdayLabel"
                      showYearDropdown
                      showMonthDropdown
                      className={showDate ? "" : "mask"}
                      selected={dob ? new Date(dob) : null}
                      // onChange={(date) => setDob(date)}
                      onChange={(date) => handleDate(date)}
                      maxDate={new Date()}
                      customInput={
                        <MaskedInput
                          type="text"
                          value={dob}
                          className={showDate ? "" : "mask"}
                          // onChange={(date) => handleDate(date)}
                          pipe={autoCorrectedDatePipe}
                          mask={[
                            /\d/,
                            /\d/,
                            "/",
                            /\d/,
                            /\d/,
                            "/",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                          ]}
                          keepCharPositions={true}
                          guide={true}
                        />
                      }
                      placeholderText="MM/DD/YYYY"
                    />

                    <Button
                      alt="show birthday date"
                      className="bday_btn show_btn"
                      onClick={toggleShowDate}
                    >
                      {showDate ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                  {submitted && !dob && (
                    <Form.Text className="text-muted">
                      This field is required.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-2 ">
                  <Form.Label id="socialSecurityLabel">
                    Social Security #
                  </Form.Label>
                  <div className="ssn_wrapper">
                    <Form.Control
                      required
                      aria-labelledby="socialSecurityLabel"
                      className={showSSN ? "" : "mask"}
                      type="text"
                      style={{ fontSize: "20px" }}
                      value={ssn}
                      maxLength={9}
                      onChange={(e) => handleSSN(e)}
                      placeholder="### - ## - ####"
                    />
                    {/* insert test for vw here, if <450px use 'onClick' toggle, else use onMouseUp 7 onMouseDown */}
                    <Button
                      className="ssn_btn show_btn"
                      alt="show social security number"
                      onClick={toggleShowSSN}
                    >
                      {showSSN ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                  {submitted && !ssn && (
                    <Form.Text className="text-muted">
                      This field is required.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-2 ">
                  <Form.Label id="driversLicenseLabel">
                    Drivers License #
                  </Form.Label>
                  <div className="dl_wrapper">
                    <Form.Control
                      required
                      aria-labelledby="driversLicenseLabel"
                      className={showDL ? "" : "mask"}
                      type="text"
                      style={{ fontSize: "20px" }}
                      value={dl}
                      onChange={(e) => setDL(e.target.value)}
                      placeholder="Drivers License #"
                    />
                    {/* insert test for vw here, if <450px use 'onClick' toggle, else use onMouseUp 7 onMouseDown */}
                    <Button
                      className="dl_btn show_btn"
                      alt="show drivers license number"
                      onClick={toggleShowDL}
                    >
                      {showDL ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                  {submitted && !dl && (
                    <Form.Text className="text-muted" style={{ color: "red" }}>
                      This field is required.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-4 ">
                  <Form.Label id="driversLicenseStateLabel">
                    Drivers License State
                  </Form.Label>

                  <Form.Control
                    id="dlState"
                    required
                    aria-labelledby="driversLicenseStateLabel"
                    type="text"
                    as="select"
                    style={{ fontSize: "20px" }}
                    value={dlState}
                    onChange={(e) => setDlState(e.target.value)}
                    placeholder="Drivers License State"
                  >
                    <option value="" disabled>
                      Select State
                    </option>

                    {stateNames.map((stateName, index) => (
                      <option key={index} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </Form.Control>

                  {submitted && !dlState && (
                    <Form.Text className="text-muted" style={{ color: "red" }}>
                      This field is required.
                    </Form.Text>
                  )}
                </Form.Group>

                <h3 className="mb-2" id="currentGigEmployerLabel">
                  Current Gig Employers
                </h3>
                <Form.Group className="mb-4 gigEmp">
                  {gigEmployers.map((employer) => (
                    <Form.Check
                      aria-labelledby="currentGigEmployerLabel"
                      key={employer}
                      type="checkbox"
                      id={`gigEmp-${employer}`}
                      label={employer}
                      checked={gigEmp.includes(employer)}
                      onChange={(e) =>
                        handleGigEmpChange(employer, e.target.checked)
                      }
                    />
                  ))}
                  {/* </Form.Control> */}
                  {submitted && !gigEmp && (
                    <Form.Text className="text-muted">
                      This field is required.
                    </Form.Text>
                  )}
                </Form.Group>

                {/* TIME IN AREA */}

                <fieldset>
                  <legend id="liveInAreaLegend">
                    <h3 className="mb-2" id="howLongInAreaLabel">
                      How long have you lived in the area?
                    </h3>
                  </legend>
                  <Form.Group className="mb-4">
                    {/* <Form.Label>How long have you lived in the area?</Form.Label> */}
                    <h4>Years:</h4>
                    <Form.Control
                      required
                      id="years"
                      aria-labelledby="howLongInAreaLabel"
                      alt="years"
                      as="select"
                      type="text"
                      style={{ fontSize: "20px" }}
                      // placeholder="Years"
                      value={time_in_area_years}
                      onChange={(e) => setTimeInAreaYears(e.target.value)}
                      onBlur={updateTimeInArea}
                    >
                      <option value="" disabled>
                        Select Years
                      </option>
                      {yearsNumbers.map((yearsNum, index) => (
                        <option key={index} value={yearsNum}>
                          {yearsNum}
                        </option>
                      ))}
                    </Form.Control>
                    {submitted && !time_in_area_years && (
                      <Form.Text className="text-muted">
                        This field is required.
                      </Form.Text>
                    )}
                    <h4 className="mt-2">Months:</h4>
                    <Form.Control
                      required
                      id="months"
                      aria-labelledby="howLongInAreaLabel"
                      alt="months"
                      as="select"
                      type="text"
                      style={{ fontSize: "20px" }}
                      // placeholder="Months"
                      value={time_in_area_months}
                      onChange={(e) => setTimeInAreaMonths(e.target.value)}
                      onBlur={updateTimeInArea}
                    >
                      <option value="" disabled>
                        Select Months
                      </option>
                      {monthsNumbers.map((monthsNum, index) => (
                        <option key={index} value={monthsNum}>
                          {monthsNum}
                        </option>
                      ))}
                    </Form.Control>
                    {submitted && !time_in_area_months && (
                      <Form.Text className="text-muted">
                        This field is required.
                      </Form.Text>
                    )}
                  </Form.Group>
                </fieldset>
                <h3 className="mb-2" id="hearAboutUsLabel">
                  How did you hear about us?
                </h3>
                <Form.Group className="mb-5">
                  <Form.Control
                    required
                    aria-labelledby="hearAboutUsLabel"
                    as="select"
                    type="text"
                    style={{ fontSize: "20px" }}
                    // placeholder="Source"
                    value={lead_source}
                    onChange={(e) => setLeadSource(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Source
                    </option>
                    {leadSources.map((leadSource, index) => (
                      <option key={index} value={leadSource}>
                        {leadSource}
                      </option>
                    ))}
                  </Form.Control>
                  {submitted && !lead_source && (
                    <Form.Text className="text-muted">
                      This field is required.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label id="smsTextLabel" className="mb-3">
                    By entering your phone number you agree to be contacted via
                    SMS for information, offers, and advertising. We will NEVER
                    spam you and you can opt-out of out messages at anytime.
                    Message & data rates apply. Message frequency varies. I have
                    read and agree to the Terms and Conditions, Consent to
                    Electronic Communications and the Company
                    <a
                      href="https://data.gowithgig.com/privacy-policy"
                      target="_blank"
                    >
                      Privacy Notice.
                    </a>
                  </Form.Label>
                  <Form.Check
                    aria-labelledby="smsTextLabel"
                    required
                    type="checkbox"
                    label="I agree"
                    style={{ fontSize: "20px" }}
                    // placeholder="Source"
                    checked={smsText}
                    onChange={(e) => setSmsText(e.target.checked)}
                  />
                  {submitted && !smsText && (
                    <Form.Text className="text-muted">
                      This field is required.
                    </Form.Text>
                  )}
                </Form.Group>
                <div className="submit_box">
                  <Form.Text className="p-2 b-2">
                    NOTE: Your application will remain 'in progress', saved in
                    this browser, for
                    <span className="thirtyDaysSpace"></span>
                    <em
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                        marginLeft: "3px",
                      }}
                    >
                      30 days
                    </em>{" "}
                    from date of starting.
                  </Form.Text>
                  <div className="submit_box">
                    {isLoading && <div className="spinner"></div>}
                    <Button
                      className="p-3"
                      variant="primary mt-5"
                      type="submit"
                      disabled={isLoading}
                    >
                      Submit Application
                    </Button>
                  </div>
                </div>

                {errorMessage && (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
              </Form>
            </div>
          </div>
          <div className="gutter_right"></div>
        </div>
      </main>
    </div>
    // </body>
  );
}

export default ApplyApp;

// change username input type/value, to text? instead of 'email'
