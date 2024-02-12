import React, { useEffect, useRef, useState } from "react";
import videoBG from "./video/bgVideo2.mp4";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
/// BaseWeb Library
import { FormControl } from "baseui/form-control";

import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
// import { StatefulInput } from "baseui/input";

//REACT DATETIME PICKER DATEPICKER
// import { DatePicker } from "baseui/datepicker";
// import { addDays } from "date-fns";

// import DateTimePicker from "react-datetime-picker";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./reserve.css";

import { isAfter, isBefore } from "date-fns";
import { ArrowRight } from "baseui/icon";

// import Login from "./login";
import Footer from "../components/footer";

// import { CiSquareRemove } from "react-icons/ci";
import { ReactComponent as CloseBtn } from "../icons/close.svg";

//LOGO
import logo from "../icons/noWordLogo.webp";
import { FaUser } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLockOpen } from "react-icons/io5";

//DATE CALENDARS
import { BsCalendar2DateFill } from "react-icons/bs";
import { GiCarKey } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const START_DATE = new Date(2019, 3, 1, 12, 0, 0);
const END_DATE = new Date(2019, 3, 10, 16, 0, 0);

const PortalHome = () => {
  const engine = new Styletron();

  const dialogRef = useRef(null);
  const resChildRef = useRef(null); //chagpt
  const resPortalRef = useRef(null);
  const modalChildRef = useRef(null); //chagpt
  const navigate = useNavigate();

  // Accessing the user data from Redux store
  //ACCESSING USER DATA FROM REDUX
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const [value, setValue] = useState(new Date());

  //modalClose_btn
  const [isHovered, setIsHovered] = useState(false);
  // Log the state for debugging <-- GETS UPDATED AT THE VERY END
  console.log("Redux User State:", userData);

  /////// CLOSING THE DIALOG (RESERVE OR PROFILE) BY CLICKING AWAY
  useEffect(() => {
    //PROFILE/ACCT MODAL
    modalChildRef.current = document.querySelector(".profile_modal_child");
    //RESERVE PORTAL MODAL
    resChildRef.current = document.querySelector(".reserve_modal_child");

    const handleClickOutsideModal = (event) => {
      if (
        dialogRef &&
        modalChildRef.current &&
        !modalChildRef.current.contains(event.target)
      ) {
        dialogRef.current.close();
      }

      if (
        resPortalRef &&
        resChildRef.current &&
        !resChildRef.current.contains(event.target)
      ) {
        resPortalRef.current.close();
      }
    };

    if (resPortalRef || dialogRef) {
      document.body.addEventListener("mousedown", handleClickOutsideModal);

      return () => {
        // Cleanup the event listener when the component unmounts
        document.body.removeEventListener("mousedown", handleClickOutsideModal);
      };
    }
  }, [dialogRef, resPortalRef]);

  /////// PASSWORD VERIFY LOGIN
  //const [passwordForm, setPasswordForm] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase letters, numbers, and symbols."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // ****************** PROFILE MODAL HANDLERS *******************

  //NAVIGATE TABS IN BOTH MODALS (PROFILE & RESERVE)
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    // Add any additional logic you want to perform when a tab is clicked
  };

  //TO CHANGE PASSWORD?
  const handleSubmitPasswordChange = async () => {
    // Validate the password first
    if (!validatePassword()) {
      return; // Stop the submission if the validation fails
    }

    // Prepare the payload
    const passwordUpdate = {
      password: password, // Assuming you want to send the new password
      lead_id: userData.lead_id, // Assuming you need to send the user's ID
    };

    try {
      console.log("Hello", passwordUpdate);
      const response = await fetch(
        "https://dev-react.holmesmotors.com/api/myaccount/password/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordUpdate),
        }
      );

      if (response.ok) {
        // Handle successful update here
        console.log("Password successfully updated");
        alert("Password updated successfully");
      } else {
        // Handle errors or unsuccessful updates
        console.error("Failed to update password");
        alert("Failed to update password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the password");
    }
  };

  //CHANGING PROFILE INFO -  FOR PROFILE MODAL
  const [formProfileData, setformProfileData] = useState({});

  //essentially loops over userData obj, and if the field is not 'create_date', 'branch' or 'lead_id', it adds it, and its current value, into the 'formProfileData' object.

  ///when a FIELD CHANGE is made ( so NOT hitting 'update' btn, just typing), the 'formProfileData' obj is updated., but no server call is made.

  //Then, when user hits 'update', a server call IS made, and the userData obj is updated/overlaid with the 'formProfileField' object.

  //userData obj doesn't yet contain 'password' or 'payment info ( billing method, address, & zip)

  //WHAT ABOUT UPDATE FOR BILLING (in profile modal)???

  useEffect(() => {
    const initialformProfileData = Object.keys(userData).reduce(
      (acc, field) => {
        if (!["create_date", "branch", "lead_id"].includes(field)) {
          //take these fields out so user can't edit them
          acc[field] = userData[field];
        }
        return acc;
      },
      {}
    );
    setformProfileData(initialformProfileData); //Assigning new 'formProfileData' obj values w/ userData field/values
  }, [userData]);

  //UPDATES FRONT END  'formProfileData' OBJECT - not a form submit, just onChange field handler
  const handleProfileChange = (e) => {
    const { id, value } = e.target; // 'id' is field here,
    setformProfileData((prevformProfileData) => ({
      ...prevformProfileData,
      [id]: value,
    }));
  };

  // FORM SUBMIT HANDLER : UPDATE BACKEND (update button handler)
  const handleProfileSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    //Need the 'lead_id' for backend call, buts missing from formProfileData obj, so here add it into new obj
    // don't need other exluded  userData fields (branch & createDate) here either bc not needed for reduc lookup
    const fullformProfileData = {
      ...formProfileData,
      lead_id: userData.lead_id, // Include lead_id in the form data
    };

    try {
      console.log("Sending:", fullformProfileData);
      const response = await fetch(
        "https://dev-react.holmesmotors.com/api/myaccount/profile/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullformProfileData),
        }
      );

      // Check if the response is okay and content type is JSON
      if (
        response.ok &&
        response.headers.get("Content-Type")?.includes("application/json")
      ) {
        //const updatedUserData = await response.json();
        console.log("Updated State: ", fullformProfileData);
        dispatch(updateUserProfile(fullformProfileData)); // Dispatch the action to update the Redux state
        alert("Profile Updated");
        console.log("userData successfully updated");
      } else {
        // Handle non-JSON responses or errors
        const textResponse = await response.text(); // Fallback to reading response as text
        console.error(
          "Failed to update form data, response was:",
          textResponse
        );
        alert("Error Updating Profile: " + textResponse);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ****************** RESERVE MODAL HANDLERS *******************

  const minDays = userData.quotes[0].min_days;

  console.log(minDays);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // Formats the date as 'YYYY-MM-DD'
  };
  //   const isReturnDateValid = (date) => {
  //     if (!resObject.pickUp) return true; // If no pick-up date is selected, don't restrict the freturn date

  //     const pickUpDate = new Date(resObject.pickUp);
  //     pickUpDate.setHours(0, 0, 0, 0);

  //     const minReturnDate = new Date(pickUpDate);
  //     minReturnDate.setDate(minReturnDate.getDate() + 5);

  //     return date >= minReturnDate;
  //   };

  //////  RESERVE OBJECT

  const [resObject, setResObject] = React.useState(() => {
    const now = new Date();
    const fiveHoursLater = new Date(now.getTime() + 5 * 60 * 60 * 1000); // Adds 5 hours to the current time

    return {
      vehicle: "",
      vehicleInfo: {
        year: "",
        make: "",
        model: "",
        stock: "",
        plate: "",
      },
      branch: "",
      status: "",
      pickUp: now.toISOString(), // Use ISO string or format as needed
      returnDate: fiveHoursLater.toISOString(), // Use ISO string or format as needed
      branchInfo: {
        branchName: "",
      },
      statusInfo: {
        statusName: "",
      },
    };
  });

  //DATEPICKER
  //  const [value, setValue] = useState(new Date());

  return (
    <div className="page_content">
      <main
        className="portal_main"
        style={{ margin: "0", height: "100vh", width: "100%" }}
      >
        <div className="row_1_portal">
          <div className="gutter_left"></div>
          <div className="portal_main_row_1">
            <h1 className="portal_title">
              {/* some c */}
              <img src={logo} alt="Logo" />
              Welcome <span>{userData.first_name}</span>!
            </h1>
            <h3 className="portalSubtitle">
              Your <span>Date</span>, Your <span>Ride</span> – let the adventure
              begin!
            </h3>
            <div className="portal_btn_container">
              <Button
                className="btn-primary-portal"
                onClick={() =>
                  (window.location.href = "http://www.gowithgig.com")
                }
              >
                GWG.com
              </Button>
              <Button
                className="btn-primary-portal"
                onClick={() => navigate("/login")}
              >
                Log Out
              </Button>
            </div>
            <div className="portal_center">
              <div className="history_box">
                <h2>Rental History</h2>
              </div>
              <div className="reserve_box">
                <h2>Reservations</h2>
                <Button
                  className="btn-primary-portal"
                  onClick={() => {
                    resPortalRef.current.showModal();
                  }}
                >
                  Reserve
                </Button>
              </div>
              <div className="profile_box">
                <h2>Profile & Acct Settings</h2>
                <Button
                  className="btn-primary-portal"
                  onClick={() => {
                    dialogRef.current.showModal();
                  }}
                >
                  MY ACCOUNT
                </Button>
              </div>
            </div>
            {/* State display for testing */}

            {/* <div className="terms_container"></div> */}
            <Footer />
          </div>
          <div className="gutter_right"></div>
        </div>
      </main>

      {/* **********************  PROFILE DIALOG CONTAINER  (NOT A FORM, just an updater********************** */}

      <dialog className="profile_modal" id="profile_modal" ref={dialogRef}>
        <button
          onClick={() => dialogRef.current.close()}
          className="modalClose_btn"
        >
          <CloseBtn />
        </button>

        <div className="profile_modal_child">
          {" "}
          {/* EQUIVALENT TO 'CONTAINER */}
          {/****** LEFTBOX *******/}
          <div className="leftbox">
            <nav>
              <a
                onClick={() => handleTabClick(0)}
                className={activeTab === 0 ? "tab active" : "tab"}
              >
                <FaUser />
              </a>
              <a
                onClick={() => handleTabClick(1)}
                className={activeTab === 1 ? "tab active" : "tab"}
              >
                <IoLockOpen />
              </a>
              <a
                onClick={() => handleTabClick(2)}
                className={activeTab === 2 ? "tab active" : "tab"}
              >
                <FaCreditCard />
              </a>

              <a
                onClick={() => handleTabClick(3)}
                className={activeTab === 3 ? "tab active" : "tab"}
              >
                <IoMdSettings />
              </a>
            </nav>
          </div>
          {/********* RIGHTBOX  (3 separate children) *********/}
          <div className="rightbox">
            {activeTab === 0 && (
              <form
                onSubmit={handleProfileSubmit} //UPDATES BACK END  obj (userData) using the front end "formProfileData" object
                className="profile tabShow"
              >
                <div className="tab_h2_box">
                  <h2>Personal Info</h2>
                </div>
                {Object.keys(formProfileData).map((field) => (
                  <div key={field} className="profile-field">
                    <label htmlFor={field}>{field.replace("_", " ")}</label>
                    <input
                      type={field === "password" ? "password" : "text"} //if field is called 'password' make 'password' the "type" for the input, otherwise 'text'
                      id={field}
                      className="input"
                      value={formProfileData[field] || ""}
                      onChange={handleProfileChange} //UPDATES FRONT END  object (formProfileData)
                    />
                  </div>
                ))}
                <Button type="submit" className=" updateBtn btn-primary-portal">
                  Update
                </Button>
              </form>
            )}

            {activeTab === 1 && (
              <div className="pwChange tabShow">
                <form
                  className="pwChange tabShow"
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent the default form submission
                    handleSubmitPasswordChange(); // Call the function to submit the form
                  }}
                >
                  {/*<--- Unique.rightbox child element 1 */}
                  <div className="tab_h2_box">
                    <h2>Change Password</h2>
                  </div>
                  {/* CHANGEABLE PROFILE FIELDS */}
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <input
                    type="password"
                    className="input"
                    placeholder="Reenter New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ marginTop: "10px" }}
                  />
                  <div>
                    {passwordError && (
                      <p style={{ color: "red" }}>{passwordError}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="updateBtn btn-primary-portal"
                  >
                    Update
                  </Button>
                </form>
              </div>
            )}

            {activeTab === 2 && (
              <div className="payment  tabShow">
                {" "}
                {/*<--- Unique.rightbox child element 2 */}
                {/* <h1>Personal Info</h1> */}
                <div className="tab_h2_box">
                  <h2>Payment Info</h2>
                </div>
                {/* MAKE THIS LOOK LIKE ONE ABOVE AND SHOULD FIX  INPUT CLICK INCONSISTENCY */}
                <div className="profile-field">
                  <label /*htmlFor={field}*/>Payment Method</label>
                  <input
                    type="text"
                    /* id={field}*/
                    className="input"
                  />
                </div>
                <div key={userData.address} className="profile-field">
                  <label htmlFor={userData.address}>Billing Address</label>
                  <input
                    type="text"
                    className="input"
                    id={userData.address}
                    // value={userData.address} //<-- causing the ::placeHolder css to be ignored
                    placeHolder={userData.address}
                  />
                </div>
                <div key={userData.zip} className="profile-field">
                  <label htmlFor={userData.zip}>Billing Zip</label>
                  <input
                    type="text"
                    id={userData.zip}
                    className="input"
                    // value={userData.zip} //<-- causing the ::placeHolder css to be ignored
                    placeHolder={userData.zip}
                  />
                </div>
                <Button className="btn-primary-portal updateBtn">Update</Button>
              </div>
            )}

            {activeTab === 3 && (
              <div className="settings tabShow">
                {/* <h1>Personal Info</h1> */}
                <h2>Account Settings</h2>
                <h3>Some account settings options</h3>

                <Button className="btn-primary-portal updateBtn">Update</Button>
              </div>
            )}
          </div>
          {/* <ul>
            <li>Lead ID: {userData.lead_id}</li>
            <li>Branch: {userData.branch}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name}</li>
            <li>Email: {userData.email}</li>
            <li>Phone: {userData.phone}</li>
            <li>Username: {userData.username}</li>
            <li>Create Date: {userData.create_date}</li>
            <li>Address: {userData.address}</li>
            <li>City: {userData.city}</li>
            <li>State: {userData.state}</li>
            <li>Zip: {userData.zip}</li>
          </ul> */}
        </div>
      </dialog>

      {/* **********************  RESERVATION DIALOG CONTAINER  (FORM) ********************** */}

      <dialog className="reserve_modal" id="reserve_modal" ref={resPortalRef}>
        <button
          onClick={() => resPortalRef.current.close()}
          className="modalClose_btn"
        >
          <CloseBtn />
        </button>

        <div className="reserve_modal_child">
          {/****** LEFTBOX *******/}
          <div className="leftbox">
            <nav>
              <a
                onClick={() => handleTabClick(0)}
                className={activeTab === 0 ? "tab active" : "tab"}
              >
                <BsCalendar2DateFill />
              </a>

              <a
                onClick={() => handleTabClick(1)}
                className={activeTab === 1 ? "tab active" : "tab"}
              >
                <GiCarKey />
              </a>

              <a
                onClick={() => handleTabClick(2)}
                className={activeTab === 2 ? "tab active" : "tab"}
              >
                <FaFileInvoiceDollar />
              </a>
              <a
                onClick={() => handleTabClick(3)}
                className={activeTab === 3 ? "tab active" : "tab"}
              >
                <FaMoneyBillTransfer />
              </a>
            </nav>
          </div>
          {/********* RIGHTBOX  (3 separate children) *********/}
          <div className="rightbox">
            {activeTab === 0 && (
              <div className="dates tabShow">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/*<--- Unique.rightbox child element 1 */}
                  <h2>Choose Your Dates</h2>
                  <h4>Pick Up & Return Date</h4>
                  <span className="dateBlock">
                    <label htmlFor="">Pick Up Date</label>
                    {/* <DateTimePicker
                      onChange={(value) =>
                        setResObject((prev) => ({ ...prev, pickUp: value }))
                      }
                      value={new Date(resObject.pickUp || value)}
                      // required
                    /> */}
                    <DatePicker />
                  </span>
                  <span className="dateBlock">
                    <label htmlFor="">Drop Off Date</label>
                    {/* <DateTimePicker
                      onChange={(value) =>
                        setResObject((prev) => ({
                          ...prev,
                          returnDate: value,
                        }))
                      }
                      value={new Date(resObject.returnDate || value)}
                      // required
                    /> */}
                    <DatePicker />
                  </span>
                  <Button
                    className="updateBtn btn-primary-portal"
                    onClick={() => {
                      if (resObject.pickUp && resObject.returnDate) {
                        setActiveTab(1); // Move to the next tab
                      } else {
                        alert("Please fill in all required fields.");
                      }
                    }}
                  >
                    Next
                  </Button>
                </LocalizationProvider>
              </div>
            )}

            {activeTab === 1 && (
              <div className="classes  tabShow">
                {" "}
                {/*<--- Unique.rightbox child element 2 */}
                {/* <h1>Personal Info</h1> */}
                <div className="tab_h2_box">
                  <h2>Classes Available For Those Dates</h2>
                </div>
                <Button
                  className="updateBtn btn-primary-portal"
                  onClick={() => {
                    // if (resObject.pickUp && resObject.returnDate) {
                    setActiveTab(2); // Move to the next tab
                    // } else {
                    //   alert("Please fill in all required fields.");
                    // }
                  }}
                >
                  Next
                </Button>
              </div>
            )}

            {activeTab === 2 && (
              <div className="confirm tabShow">
                {/* <h1>Personal Info</h1> */}
                <h2>Invoice</h2>
                <h3>Confirm your order</h3>

                <Button
                  className="updateBtn btn-primary-portal"
                  onClick={() => {
                    // if (resObject.pickUp && resObject.returnDate) {
                    setActiveTab(3); // Move to the next tab
                    // } else {
                    //   alert("Please fill in all required fields.");
                    // }
                  }}
                >
                  Next
                </Button>
              </div>
            )}
            {activeTab === 3 && (
              <div className="payment tabShow">
                {/* <h1>Personal Info</h1> */}
                <h2>Payment</h2>
                <h3>Enter your payment below</h3>

                <Button
                  className="updateBtn btn-primary-portal"
                  onClick={() => {
                    //SUBMIT RES OBJECT
                  }}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
          {/* <ul>
            <li>Lead ID: {userData.lead_id}</li>
            <li>Branch: {userData.branch}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name}</li>
            <li>Email: {userData.email}</li>
            <li>Phone: {userData.phone}</li>
            <li>Username: {userData.username}</li>
            <li>Create Date: {userData.create_date}</li>
            <li>Address: {userData.address}</li>
            <li>City: {userData.city}</li>
            <li>State: {userData.state}</li>
            <li>Zip: {userData.zip}</li>
          </ul> */}
        </div>
      </dialog>
    </div>
  );
};

export default PortalHome;
