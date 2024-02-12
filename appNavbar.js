import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

// IMAGES
import logo3 from "../icons/noWordLogo.webp";

///////  REDUX ///////////
import { logout } from '../redux/actions';

function App_Navbar() {
	const [open, setOpen] = useState(false);
	const [locationActive, setLocationActive] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	// const location = useLocation();
	const navigate = useNavigate();

	const location = useLocation();

	const storeGclidInSession = () => {
		const params = new URLSearchParams(location.search);
		const gclid = params.get('gclid');
		console.log("GCLID:", gclid); // Debugging line

		if (gclid) {
			sessionStorage.setItem('gclid', gclid);
		}
	};

	useEffect(() => {
		storeGclidInSession();
	}, [location]);

	// Update the screenWidth state when the window size changes, for 'locations' dropdown return difference
	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Moving '.active' class to currently-clicked Nav.Link
	const handleNavClick = (navLink) => {
		const navLinks = document.querySelectorAll(".nav-link");
		navLinks.forEach((link) => {
			if (!link.classList.contains(navLink)) {
				link.classList.remove("active");
				if (locationActive) {
					setLocationActive(false);
				}
			}
			// check if this is the .nav-link clicked on
			if (link.classList.contains(navLink)) {
				if (link.classList.contains("locations")) {
					setLocationActive(true); // its aleready been rendered, "active"/"" applied
				}
				// if it is an already has the BS-added 'active', leave it alone
				link.classList.add("active");
			}
		});
	};
	//Close 'Locations' dropdown if other Nav.Link is clicked.
	const closeLocations = () => {
		if (open) {
			setOpen(!open);
			setLocationActive(false);
		} else {
			return;
		}
	};
	// Close expanded <Navbar.Collapse/> when clicking outside of the Navbar
	window.onload = function () {
		document.addEventListener("click", function (event) {
			// if the clicked element isn't child of the navbar, you must close it if is open
			if (
				!event.target.closest("#navbar_id") &&
				document.getElementById("navbarScroll").classList.contains("show")
			) {
				document.getElementById("hamburger_menu_button").click();
			}
		});
	};

	useEffect(() => {
		const handleLocationDesktop = (event) => {
			if (screenWidth > 850 && !event.target.closest("#navbar_id") && open) {
				closeLocations();
			}
		};

		document.addEventListener("click", handleLocationDesktop);

		return () => {
			document.removeEventListener("click", handleLocationDesktop);
		};
	});


	/// Handle Logout Function
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/'); // Redirect to login page
	};

	return (
		<Navbar
			// expand="md"
			className="position-absolute w-100 bg-body-tertiary p-0"
			id="navbar_id"
			expand="lg"
		>
			<Container fluid>
				<Navbar.Brand
					href="#"
					className="pb-0"
					onClick={() => {
						navigate("/");
						closeLocations();
						handleNavClick("home");
					}}
				>
					<Image
						className="logo"
						src={logo3}
						alt="logo"
						style={{ marginRight: "-4px" }}
					/>
					GoWithGIG
				</Navbar.Brand>

				<Navbar.Toggle
					id="hamburger_menu_button"
					aria-controls="navbarScroll"
				/>
				{/* set openNav to true when Collapse is open */}
				<Navbar.Collapse className="p-0" id="navbarScroll">
					<Nav className="me-auto " navbarScroll>
						<Nav.Link
							as={Link}
							to="/"
							onClick={() => {
								closeLocations();
								handleNavClick("home");
							}}
							className=" p-3 home-link home"
							href="#action1"
						>
							Home
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="/about-us"
							onClick={() => {
								closeLocations();
								handleNavClick("aboutUs");
							}}
							className=" p-3 aboutUs"
							href="#action1"
						>
							About Us
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="/apply"
							onClick={() => {
								closeLocations();
								handleNavClick("apply");
							}}
							className=" p-3 apply"
							href="#action1"
						>
							Apply
						</Nav.Link>

						<Nav.Link
							as={Link}
							to="#"
							onClick={() => {
								closeLocations();
								handleNavClick("logout");
								handleLogout(); // Call the logout function on click
							}}
							className="m-0 p-3 logout" // Update the className if needed
						>
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default App_Navbar;
