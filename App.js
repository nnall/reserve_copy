import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PortalHome from "./components/portalHome";

import TOS from "./pages/TOS";
import PrivPol from "./pages/PrivPol";

//Google Analytics
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
//////// RESERVE CSS

import style from "./components/reserve.css";
///////  REACT-BOOTSTRAP STYLING ///////////
import "bootstrap/dist/css/bootstrap.min.css";

////// Redux
import ProtectedRoute from "./redux/protectedRoutes.js";

////// ROUTES
import CreateAcct from "./components/createAcct";
import Login from "./components/login.js";

////// FOOTER
import Footer from "./components/footer.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/create-acct" element={<CreateAcct />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <PortalHome />
              </ProtectedRoute>
            }
          />

          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<PrivPol />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
