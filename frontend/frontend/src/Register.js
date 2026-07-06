// Bring React library.
// React helps us create webpages.
import React, { useState } from "react";

// Bring Link.
// Link helps us move between pages
// without refreshing the website.
import { Link } from "react-router-dom";

// Bring CSS file.
// This file gives design to Register page.
import "./Register.css";


// Main Register function.
// Whenever Register page opens,
// this function starts running.
function Register() {

  // ----------------------------
  // NAME STATE
  // ----------------------------

  // Store user's name.
  //
  // Example:
  //
  // Before typing
  // name = ""
  //
  // User types
  // Saksham
  //
  // Now
  // name = "Saksham"
  const [name, setName] = useState("");


  // ----------------------------
  // EMAIL STATE
  // ----------------------------

  // Store user's email.
  //
  // Example:
  //
  // Before
  // email = ""
  //
  // User types
  // abc@gmail.com
  //
  // Now
  // email = "abc@gmail.com"
  const [email, setEmail] = useState("");


  // ----------------------------
  // PASSWORD STATE
  // ----------------------------

  // Store user's password.
  //
  // Example:
  //
  // Before
  // password = ""
  //
  // User types
  // 123456
  //
  // Now
  // password = "123456"
  const [password, setPassword] = useState("");



  // ----------------------------
  // REGISTER FUNCTION
  // ----------------------------

  // This function runs
  // when Register button is clicked.
  const handleRegister = async (e) => {

    // Stop page refresh.
    //
    // Normally form refreshes page.
    // We don't want that.
    e.preventDefault();

    // Try running the code.
    // If any error comes,
    // catch block will run.
    try {

      // Send Register request
      // to backend.
      //
      // Real Life Example:
      //
      // Student fills admission form.
      //
      // Office checks details.
      //
      // Office saves details.
      //
      // Office replies:
      // Admission Successful.
      //
      // Same here.
      //
      // React → Backend → Database
      const response = await fetch("http://localhost:5000/register", {

        // POST means
        // send data.
        method: "POST",

        // Tell backend
        // data is JSON.
        headers: {

          "Content-Type": "application/json"

        },

        // Convert all information
        // into JSON format.
        //
        // Example
        //
        // {
        // name:"Saksham",
        // email:"abc@gmail.com",
        // password:"123456"
        // }
        body: JSON.stringify({

          name,

          email,

          password

        })

      });



      // Wait until backend replies.
      //
      // Example:
      //
      // You submit admission form.
      //
      // Wait...
      //
      // Office checks details.
      //
      // Office replies.
      const data = await response.text();



      // Show backend message.
      //
      // Example:
      //
      // User registered successfully
      //
      // OR
      //
      // Email already exists
      alert(data);



      // Check whether
      // registration is successful.
      //
      // IMPORTANT:
      // Your backend sends
      //
      // "User registered successfully ✔"
      //
      // So write exactly the same text here.
      if (data.includes("User registered successfully")) {

        // Open Login page.
        //
        // Example:
        //
        // Registration completed.
        //
        // Now go to Login page.
        window.location.href = "/";

      }

    }

    // If any server error comes,
    // this block runs.
    catch (error) {

      // Print error in console.
      console.log(error);

      // Show error.
      alert("Server Error ❌");

    }

  };



  // return means
  // show everything on webpage.
  return (

    // Main container.
    <div className="register-container">

      {/* Register Card */}
      <div className="register-card">

        {/* Page Heading */}
        <h2>Create Your Account</h2>

        {/* Registration Form */}
        <form onSubmit={handleRegister}>

          {/* Name Input */}

          <input

            type="text"

            placeholder="Enter Name"

            value={name}

            // Save name
            // while user types.
            //
            // Example:
            //
            // User types
            //
            // S
            // Sa
            // Sak
            // Saks
            //
            // React saves every letter.
            onChange={(e) => setName(e.target.value)}

            required

          />



          {/* Email Input */}

          <input

            type="email"

            placeholder="Enter Email"

            value={email}

            // Save email
            // while typing.
            onChange={(e) => setEmail(e.target.value)}

            required

          />



          {/* Password Input */}

          <input

            type="password"

            placeholder="Enter Password"

            value={password}

            // Save password
            // while typing.
            onChange={(e) => setPassword(e.target.value)}

            required

          />



          {/* Register Button */}

          <button

            className="register-btn"

            type="submit"

          >

            Register

          </button>

        </form>



        {/* Login Link */}

        <div className="login-link">

          Already have an account?

          <Link to="/">

            Login

          </Link>

        </div>

      </div>

    </div>

  );

}


// Export Register page.
//
// App.js can now use it.
export default Register;