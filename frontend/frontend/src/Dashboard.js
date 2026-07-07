// Bring useEffect and useState.
//
// useState -> Stores data.
//
// useEffect -> Runs code automatically.
//
// Example:
//
// Imagine your alarm rings every morning.
//
// You don't press any button.
//
// It runs automatically.
//
// useEffect works like that.
import { useEffect, useState } from "react";


// Bring useNavigate.
//
// It helps move from one page to another.
//
// Example:
//
// Login
//   │
//   ▼
// Dashboard
//
// navigate("/dashboard")
//
// opens Dashboard page.
import { useNavigate } from "react-router-dom";


// Bring Dashboard CSS.
//
// This file gives design
// to Dashboard page.
import "./Dashboard.css";



// Main Dashboard function.
//
// Whenever Dashboard page opens,
// this function starts running.
function Dashboard() {

  // useNavigate is used
  // to change pages.
  const navigate = useNavigate();



  // ----------------------------
  // JOBS STATE
  // ----------------------------

  // Store all jobs.
  //
  // Example:
  //
  // Initially
  //
  // jobs = []
  //
  // Empty because
  // backend has not replied yet.
  //
  // After backend replies
  //
  // jobs = [
  //   Job1,
  //   Job2,
  //   Job3
  // ]
  //
  // Think of it as
  // an empty basket.
  //
  // Backend fills
  // this basket.
  const [jobs, setJobs] = useState([]);




  // ----------------------------
  // useEffect
  // ----------------------------

  // This code runs automatically
  // when Dashboard opens.
  //
  // Example:
  //
  // You open Dashboard.
  //
  // React automatically runs
  // everything inside useEffect().
  useEffect(() => {




    // Get login token
    // from browser.
    //
    // Example:
    //
    // Browser Locker
    //
    // ----------------
    // TOKEN
    // abc123
    // ----------------
    //
    // localStorage gives
    // us this token.
    const token = localStorage.getItem("token");




    // Check whether
    // token exists.
    //
    // Example
    //
    // Browser Locker
    //
    // Empty
    //
    // User is NOT logged in.
    //
    // Open Login page.
    if (!token) {

      navigate("/");

    }




    // Send request
    // to backend.
    //
    // Real Life Example
    //
    // Student asks teacher
    //
    // "Please show attendance."
    //
    // Teacher checks register.
    //
    // Teacher gives attendance.
    //
    // Same here
    //
    // React
    //   │
    // Request Jobs
    //   │
    // Backend
    fetch("https://job-portal-weft.onrender.com/jobs", {

      // Send token
      // to backend.
      //
      // Backend checks
      // whether user
      // is logged in.
      headers: {

        Authorization: token,

      },

    })



    // Backend replied.
    //
    // Convert response
    // into JSON.
    //
    // Example
    //
    // Backend sends
    //
    // Jobs List
    //
    // React reads it.
      .then((res) => res.json())



    // Save jobs
    // inside jobs state.
    //
    // Example
    //
    // Before
    //
    // jobs=[]
    //
    // After
    //
    // jobs=[
    // Google,
    // Microsoft,
    // Amazon
    // ]
      .then((data) => setJobs(data))



    // If error comes,
    // print it.
    //
    // Example
    //
    // Server Down
    //
    // Internet Off
    //
    // Database Error
      .catch((err) => console.log(err));



  }, [navigate]);

  // ----------------------------
  // LOGOUT FUNCTION
  // ----------------------------

  // This function runs
  // when Logout button is clicked.
  function logout() {

    // Remove token from browser.
    //
    // Example:
    //
    // Before Logout
    //
    // Browser Locker
    // ------------------
    // TOKEN = abc123
    // USER = saksham@gmail.com
    // ------------------
    //
    // After Logout
    //
    // Browser Locker
    // ------------------
    // TOKEN = Empty
    // ------------------
    //
    // User is no longer logged in.
    localStorage.removeItem("token");



    // Remove saved email.
    //
    // Example:
    //
    // USER
    // saksham@gmail.com
    //
    // becomes
    //
    // USER = Empty
    localStorage.removeItem("user");



    // Open Login page.
    //
    // Example
    //
    // Dashboard
    //      │
    //      ▼
    // Login Page
    navigate("/");

  }



  // return means
  // show everything on webpage.
  return (

    // Main Dashboard container.
    <div className="dashboard">

      {/* Dashboard Heading */}

      <h1 className="dashboard-title">

        Welcome to Job Portal 🎉

      </h1>



      {/* Small description */}

      <p className="dashboard-subtitle">

        Manage your jobs efficiently from one place.

      </p>




      {/* Cards Container */}

      <div className="dashboard-cards">



        {/* ------------------------
            TOTAL JOBS CARD
        ------------------------- */}

        <div className="card">

          <h2>Total Jobs</h2>

          {/* jobs.length counts
              total jobs.

              Example

              jobs = [

              Google,

              Amazon,

              Microsoft

              ]

              Total Jobs = 3
          */}

          <p>

            {jobs.length}

          </p>

        </div>





        {/* ------------------------
            COMPANIES CARD
        ------------------------- */}

        <div className="card">

          <h2>Companies</h2>

          {/* Count different companies.

              Example

              Google

              Google

              Amazon

              Microsoft

              Google

              Different Companies

              Google

              Amazon

              Microsoft

              Total = 3

              new Set()
              removes duplicates.
          */}

          <p>

            {new Set(jobs.map(job => job.company)).size}

          </p>

        </div>





        {/* ------------------------
            LOCATIONS CARD
        ------------------------- */}

        <div className="card">

          <h2>Locations</h2>

          {/* Count different locations.

              Example

              Delhi

              Delhi

              Noida

              Gurgaon

              Delhi

              Different Locations

              Delhi

              Noida

              Gurgaon

              Total = 3
          */}

          <p>

            {new Set(jobs.map(job => job.location)).size}

          </p>

        </div>



      </div>





      {/* Logout Button */}

      <button

        className="logout-btn"

        onClick={logout}

      >

        Logout

      </button>

    </div>

  );

}



// Export Dashboard.
//
// Now App.js can use it.
export default Dashboard;