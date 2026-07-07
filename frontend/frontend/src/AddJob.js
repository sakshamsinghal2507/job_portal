// Bring useState and useEffect.
//
// useState -> Stores data.
//
// useEffect -> Runs code automatically.
//
// Example:
//
// useState
// = A notebook where React stores values.
//
// useEffect
// = Like an automatic machine.
// Whenever page opens,
// it starts working automatically.
import { useState, useEffect } from "react";



// Bring useNavigate.
//
// It helps us move
// from one page to another.
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



// Bring CSS file.
//
// CSS gives design
// to this page.
import "./AddJob.css";



// Main AddJob function.
//
// Whenever Add Job page opens,
// this function starts running.
function AddJob() {



  // useNavigate helps
  // us change pages.
  const navigate = useNavigate();



  // ----------------------------
  // JOB TITLE
  // ----------------------------

  // Store Job Title.
  //
  // Example:
  //
  // Before typing
  //
  // title = ""
  //
  // User types
  //
  // Software Engineer
  //
  // Now
  //
  // title = "Software Engineer"
  const [title, setTitle] = useState("");



  // ----------------------------
  // COMPANY
  // ----------------------------

  // Store Company Name.
  //
  // Example:
  //
  // company=""
  //
  // User types
  //
  // Google
  //
  // company="Google"
  const [company, setCompany] = useState("");



  // ----------------------------
  // SALARY
  // ----------------------------

  // Store Salary.
  //
  // Example:
  //
  // salary=""
  //
  // User types
  //
  // 50000
  //
  // salary="50000"
  const [salary, setSalary] = useState("");



  // ----------------------------
  // LOCATION
  // ----------------------------

  // Store Job Location.
  //
  // Example:
  //
  // location=""
  //
  // User types
  //
  // Noida
  //
  // location="Noida"
  const [location, setLocation] = useState("");



  // ----------------------------
  // useEffect
  // ----------------------------

  // This code runs automatically
  // when Add Job page opens.
  //
  // Example:
  //
  // User opens Add Job page.
  //
  // React automatically checks
  // whether user is logged in.
  useEffect(() => {



    // Get token
    // from browser.
    //
    // Example:
    //
    // Browser Locker
    //
    // TOKEN
    // abc123
    //
    // localStorage gives
    // us this token.
    const token = localStorage.getItem("token");



    // Check whether
    // token exists.
    //
    // if (!token)
    //
    // means
    //
    // "If token is NOT found."
    //
    // Example:
    //
    // Browser Locker
    //
    // Empty
    //
    // User is not logged in.
    if (!token) {

      // Open Login page.
      navigate("/");

    }

  }, [navigate]);



  // ----------------------------
  // HANDLE SUBMIT
  // ----------------------------

  // This function runs
  // when Add Job button is clicked.
  const handleSubmit = async (e) => {



    // Stop page refresh.
    //
    // Normally,
    // forms refresh page.
    //
    // We don't want that.
    e.preventDefault();



    // ----------------------------
    // VALIDATION
    // ----------------------------

    // trim() removes
    // spaces from beginning
    // and end.
    //
    // Example:
    //
    // "   Google   "
    //
    // becomes
    //
    // "Google"
    //
    // Another Example
    //
    // "      "
    //
    // becomes
    //
    // ""
    //
    // Empty.
    if (

      title.trim() === "" ||

      company.trim() === "" ||

      location.trim() === ""

    ) {

      // Show warning.
      alert("Fields cannot be empty or contain only spaces.");

      // Stop further execution.
      //
      // Example:
      //
      // Teacher says
      //
      // "Stop."
      //
      // Nobody moves ahead.
      return;

    }



    // Check Salary.
    //
    // isNaN()
    //
    // means
    //
    // "Is this NOT a Number?"
    //
    // Examples
    //
    // Salary
    // 50000
    //
    // Valid
    //
    //
    // Salary
    // abc
    //
    // Invalid
    //
    //
    // Salary
    // -100
    //
    // Invalid
    if (

      isNaN(salary) ||

      Number(salary) <= 0

    ) {

      alert("Salary must be a valid positive number.");

      return;

    }



    // Try running code.
    //
    // If any error comes,
    // catch block will run.
    try {

      // Get token
      // again from browser.
      //
      // This token will be
      // sent to backend.
      const token = localStorage.getItem("token");
            // Send data
      // to backend.
      //
      // Real Life Example:
      //
      // You fill a Job Form.
      //
      // ▼
      //
      // Submit Form
      //
      // ▼
      //
      // Office receives form.
      //
      // ▼
      //
      // Office saves it.
      //
      // Same here:
      //
      // React
      //    │
      // Sends Job Details
      //    │
      // Backend
      const response = await fetch("https://job-portal-weft.onrender.com/add-job", {

        // POST means
        // Send data.
        //
        // GET = Receive Data
        //
        // POST = Send Data
        method: "POST",

        // Headers tell backend
        // what kind of data
        // is being sent.
        headers: {

          // Data is JSON format.
          "Content-Type": "application/json",

          // Send login token.
          //
          // Example:
          //
          // Student shows ID Card.
          //
          // Teacher checks
          // whether student belongs
          // to the school.
          //
          // Token works like
          // an ID Card.
          Authorization: token,

        },



        // Convert all job details
        // into JSON.
        //
        // Example:
        //
        // Before
        //
        // title = Developer
        //
        // company = Google
        //
        // salary = 50000
        //
        // location = Noida
        //
        // After JSON.stringify()
        //
        // {
        // title:"Developer",
        // company:"Google",
        // salary:"50000",
        // location:"Noida"
        // }
        body: JSON.stringify({

          title: title,

          company: company,

          salary: salary,

          location: location,

        }),

      });



      // Wait until backend replies.
      //
      // Example:
      //
      // Office receives form.
      //
      // Saves it.
      //
      // Sends message.
      //
      // "Job Added Successfully"
      const data = await response.text();



      // Show backend message.
      //
      // Example
      //
      // Job added successfully
      alert(data);




      // Clear all input boxes.
      //
      // Example:
      //
      // Before
      //
      // Title = Developer
      //
      // Company = Google
      //
      // After
      //
      // Title = Empty
      //
      // Company = Empty
      //
      // Form becomes ready
      // for next job.
      setTitle("");

      setCompany("");

      setSalary("");

      setLocation("");

    }

    // If any error comes,
    // this block runs.
    catch (error) {

      // Print error.
      console.log(error);

      // Show error.
      alert("Server Error ❌");

    }

  };



  // return means
  // show everything
  // on webpage.
  return (

    // Main container.
    <div className="addjob-container">

      {/* Page Heading */}

      <h1 className="addjob-title">

        Add New Job ➕

      </h1>



      {/* Form */}

      <form

        onSubmit={handleSubmit}

        className="addjob-form"

      >



        {/* Job Title */}

        <input

          type="text"

          placeholder="Job Title"

          value={title}

          // Save title
          // while typing.
          //
          // Example:
          //
          // User types
          //
          // Software Engineer
          //
          // title updates automatically.
          onChange={(e) => setTitle(e.target.value)}

          required

        />



        {/* Company Name */}

        <input

          type="text"

          placeholder="Company Name"

          value={company}

          // Maximum
          // 50 characters.
          //
          // User cannot type
          // more than 50 letters.
          maxLength={"50"}

          onChange={(e) => setCompany(e.target.value)}

          required

        />



        {/* Salary */}

        <input

          type="text"

          // Minimum allowed value.
          //
          // Example:
          //
          // 0 ❌
          //
          // -10 ❌
          //
          // 10000 ✅
          min="1"

          placeholder="Salary"

          value={salary}

          onChange={(e) => setSalary(e.target.value)}

          required

        />



        {/* Location */}

        <input

          type="text"

          placeholder="Location"

          value={location}

          // Maximum
          // 40 letters.
          maxLength={"40"}

          onChange={(e) => setLocation(e.target.value)}

          required

        />



        {/* Add Job Button */}

        <button type="submit">

          Add Job

        </button>

      </form>

    </div>

  );

}



// Export AddJob.
//
// App.js can now use it.
export default AddJob;