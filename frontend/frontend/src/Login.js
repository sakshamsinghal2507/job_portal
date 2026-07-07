// Bring React library.
// React is used to build webpages.
import React, { useState } from "react";

// Bring Link from react-router-dom.
// Link helps us move from one page to another
// without refreshing the website.
import { Link } from "react-router-dom";

// Bring Login.css file.
// This file gives design to Login page.
import "./Login.css";


// Main Login function.
// Whenever Login page opens,
// this function starts running.
function Login() {

  // ----------------------------
  // EMAIL STATE
  // ----------------------------

  // Store email entered by user.
  //
  // Example:
  //
  // At first
  // email = ""
  //
  // User types:
  // saksham@gmail.com
  //
  // Now
  // email = "saksham@gmail.com"
  //
  // Think of it like a notebook.
  // Whatever user writes is saved here.
  const [email, setEmail] = useState("");


  // ----------------------------
  // PASSWORD STATE
  // ----------------------------

  // Store password entered by user.
  //
  // Example:
  //
  // password = ""
  //
  // User types:
  // 123456
  //
  // Now
  // password = "123456"
  const [password, setPassword] = useState("");



  // ----------------------------
  // LOGIN FUNCTION
  // ----------------------------

  // This function runs
  // when Login button is clicked.
  const handleLogin = async (e) => {

    // Stop page refresh.
    //
    // Example:
    //
    // Normally form reloads page.
    //
    // We don't want that.
    //
    // So preventDefault()
    // stops page refresh.
    e.preventDefault();



    // Try running the code.
    //
    // If any error comes,
    // catch block will run.
    try {

      // Send login request
      // to backend.
      //
      // Real Life Example:
      //
      // You → Waiter → Kitchen
      //
      // You order Pizza.
      //
      // Waiter takes order.
      //
      // Kitchen prepares pizza.
      //
      // Waiter brings pizza.
      //
      // Same here:
      //
      // React → Backend
      //
      // Backend checks database
      // and sends response back.
      const response = await fetch("https://job-portal-weft.onrender.com/login", {

        // POST means
        // send data.
        //
        // GET = Receive data
        //
        // POST = Send data
        method: "POST",

        // Tell backend
        // data is JSON.
        headers: {

          "Content-Type": "application/json"

        },

        // Convert email & password
        // into JSON format.
        //
        // Example:
        //
        // Before
        //
        // email = abc@gmail.com
        //
        // password = 12345
        //
        // After converting
        //
        // {
        // email:"abc@gmail.com",
        // password:"12345"
        // }
        body: JSON.stringify({

          email: email,

          password: password

        })

      });



      // Wait until backend replies.
      //
      // Example:
      //
      // You ordered pizza.
      //
      // Wait...
      //
      // Wait...
      //
      // Pizza arrives.
      //
      // Now continue.
      const data = await response.json();



      // Print backend response.
      //
      // Console means
      // programmer's notebook.
      //
      // User cannot see this.
      console.log("LOGIN RESPONSE:", data);



      // Show message on screen.
      //
      // Example:
      //
      // Login Successful
      //
      // OR
      //
      // Invalid Password
      alert(data.message);



      // Check whether backend
      // sent token.
      //
      // Example:
      //
      // Token received
      //
      // abc123xyz
      //
      // Login Successful
      //
      //
      // No token
      //
      // Login Failed
      if (data.token) {

        // Print token.
        console.log("TOKEN FOUND:", data.token);



        // Save token
        // inside browser.
        //
        // Think of browser
        // as having a locker.
        //
        // ------------------
        // Browser Locker
        //
        // TOKEN
        // abc123
        // ------------------
        //
        // Whenever backend asks
        // browser says:
        //
        // Here is my token.
        localStorage.setItem("token", data.token);



        // Save user's email.
        //
        // Example
        //
        // user
        //
        // saksham@gmail.com
        localStorage.setItem("user", email);



        // Open Dashboard page.
        //
        // Example:
        //
        // Like typing
        //
        // google.com
        //
        // Browser opens Google.
        //
        // Here browser opens
        //
        // /dashboard
        window.location.href = "/dashboard";

      }

    }

    // If server is down
    // or internet problem comes,
    // this block runs.
    catch (error) {

      // Print error.
      console.log(error);

      // Show error.
      alert("Server Error ❌");

    }

  };



  // return means
  // show this on webpage.
  return (

    // Main container.
    <div className="login-container">

      {/* Login box */}
      <div className="login-card">

        {/* Heading */}
        <h2>Job Portal Login</h2>

        {/* Login form */}
        <form onSubmit={handleLogin}>

          {/* Email input */}

          <input

            type="email"

            placeholder="Enter Email"

            value={email}

            // Whenever user types,
            // save new value.
            //
            // Example
            //
            // User types A
            //
            // email = "A"
            //
            // User types AB
            //
            // email = "AB"
            onChange={(e) => setEmail(e.target.value)}

            required

          />



          {/* Password input */}

          <input

            type="password"

            placeholder="Enter Password"

            value={password}

            // Save password
            // while user types.
            onChange={(e) => setPassword(e.target.value)}

            required

          />



          {/* Login Button */}

          <button

            className="login-btn"

            type="submit"

          >

            Login

          </button>

        </form>



        {/* Register Link */}

        <div className="register-link">

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </div>

      </div>

    </div>

  );

}


// Export Login page.
//
// Now App.js can use it.
export default Login;