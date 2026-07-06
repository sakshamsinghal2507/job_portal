// Bring useNavigate and NavLink from react-router-dom.
//
// useNavigate -> Used to move from one page to another.
//
// NavLink -> Used to create menu links.
// It also highlights the current page automatically.
import { useNavigate, NavLink } from "react-router-dom";

// Bring Navbar CSS file.
//
// This file gives design to Navbar.
import "./Navbar.css";


// Main Navbar function.
//
// Whenever Navbar appears,
// this function starts running.
function Navbar() {

  // ----------------------------
  // NAVIGATE
  // ----------------------------

  // useNavigate helps us change pages.
  //
  // Example:
  //
  // Suppose you are on Login page.
  //
  // Login
  //   │
  //   ▼
  // Dashboard
  //
  // navigate("/dashboard")
  // opens Dashboard page.
  const navigate = useNavigate();



  // ----------------------------
  // LOGOUT FUNCTION
  // ----------------------------

  // This function runs
  // when Logout button is clicked.
  function logout() {

    // Remove login token
    // from browser.
    //
    // Think of browser as having a locker.
    //
    // Before Logout
    //
    // Browser Locker
    // ------------------
    // TOKEN = abc123
    // ------------------
    //
    // After removeItem()
    //
    // Browser Locker
    // ------------------
    // TOKEN = Empty
    // ------------------
    //
    // Now backend will not
    // recognize the user.
    localStorage.removeItem("token");



    // Open Login page.
    //
    // Example:
    //
    // User clicks Logout.
    //
    // Current Page
    // Dashboard
    //
    // ▼
    //
    // Login Page Opens
    navigate("/");
  }



  // return means
  // show everything on webpage.
  return (

    // Main Navbar container.
    <div className="navbar">

      {/* Website Logo */}

      <div className="logo">

        Job Portal 💼

      </div>



      {/* Navigation Links */}

      <div className="nav-links">

        {/* Jobs Page Link */}

        {/* Example:
        
           If user clicks Jobs

           Login
             │
             ▼
           Jobs Page Opens

           URL becomes

           /jobs

        */}

        <NavLink to="/jobs">

          Jobs

        </NavLink>



        {/* Dashboard Link */}

        {/* Example:

           Click Dashboard

           URL becomes

           /dashboard

        */}

        <NavLink to="/dashboard">

          Dashboard

        </NavLink>



        {/* Add Job Link */}

        {/* Example:

           Click Add Job

           URL becomes

           /add-job

        */}

        <NavLink to="/add-job">

          Add Job

        </NavLink>



        {/* Logout Button */}

        {/* Example:

           User clicks Logout

           Step 1
           Remove Token

           Step 2
           Open Login Page

           User is logged out successfully.
        */}

        <button

          onClick={logout}

          className="logout-btn"

        >

          Logout

        </button>

      </div>

    </div>

  );

}


// Export Navbar.
//
// App.js can now use Navbar.
export default Navbar;