// ========================
// IMPORTS
// ========================

// Bring Express library.
// Express helps us create backend APIs.
const express = require("express");

// Bring CORS library.
// It allows frontend and backend to talk.
const cors = require("cors");

// Bring bcrypt library.
// It changes normal password into secret password.
const bcrypt = require("bcrypt");

// Bring database connection.
// We will use it to talk with MySQL.
const db = require("./db");

// Bring JWT library.
// JWT is used for login token.
const jwt = require("jsonwebtoken");

// Print message in terminal.
// This tells us server file is running.
console.log("SERVER FILE ACTIVE");

// Secret key for JWT.
// Used to create and check login token.
const SECRET_KEY = "jobportal_secret_key";


// ========================
// APP
// ========================

// Create backend application.
// All APIs will be made using "app".
const app = express();


// Function means a block of code.
// This function checks whether user is logged in.
function verifyToken(req, res, next) {

    // Get token sent by frontend.
    // Token tells backend who the user is.
    const token = req.headers["authorization"];

    // if means "check".
    // If token is not present, stop the user.
    if (!token) {

        // return means stop here.
        // Send message back to frontend.
        return res.status(403).send("Token missing");
    }

    // Try to check token.
    // If error comes, catch block will run.
    try {

        // Check whether token is correct.
        // SECRET_KEY is used to verify token.
        const decoded = jwt.verify(token, SECRET_KEY);

        // Save user information.
        // Other APIs can use this later.
        req.user = decoded;

        // Go to next API.
        next();

    } catch (err) {

        // Token is wrong or expired.
        // Do not allow user.
        return res.status(401).send("Invalid Token");
    }
}


// Use CORS in whole project.
// Now React can call backend APIs.
app.use(cors());

// Read JSON data coming from frontend.
// Without this, backend cannot read form data.
app.use(express.json());


// ========================
// HOME
// ========================

// Create Home API.
// Runs when localhost:5000 is opened.
app.get("/", (req, res) => {

    // Send message to browser.
    res.send("Backend is working 🚀");

});

// ========================
// REGISTER USER
// ========================

// Create Register API.
// When user clicks Register button,
// frontend sends data here.
app.post("/register", async (req, res) => {

    // Get name, email and password
    // sent from frontend form.
    const { name, email, password } = req.body;

    // Try running the code.
    // If any error comes, catch block will run.
    try {

        // SQL query to check
        // whether email already exists.
        const checkSql = "SELECT * FROM users WHERE email = ?";

        // Run SQL query.
        // [email] is sent safely to MySQL.
        db.query(checkSql, [email], async (err, result) => {

            // If database gives error.
            if (err) {

                // Print error in terminal.
                console.log(err);

                // Stop here and send message.
                return res.send("Database Error");
            }

            // result.length tells
            // how many records are found.
            if (result.length > 0) {

                // Email already exists.
                // Do not register again.
                return res.send("Email already exists");
            }

            // Change password into secret code.
            // Password will stay safe in database.
            const hashedPassword = await bcrypt.hash(password, 10);

            // Print original password.
            // Only for testing.
            console.log("Original Password:", password);

            // Print encrypted password.
            // Only for testing.
            console.log("Hashed Password:", hashedPassword);

            // SQL query to insert user.
            const sql =
                "INSERT INTO users (name,email,password) VALUES (?,?,?)";

            // Run insert query.
            db.query(
                sql,

                // Send values to database.
                [name, email, hashedPassword],

                // This runs after query finishes.
                (err, result) => {

                    // If error comes.
                    if (err) {

                        // Print error.
                        console.log(err);

                        // Send failure message.
                        res.send("Registration Failed");

                    } else {

                        // Registration successful.
                        res.send("User registered successfully ✔");
                    }

                }
            );

        });

    } catch (error) {

        // Print server error.
        console.log(error);

        // Send server error message.
        res.send("Server Error");
    }

});



// ========================
// LOGIN USER
// ========================

// Create Login API.
// Frontend sends email and password here.
app.post("/login", (req, res) => {

    // Get email and password
    // from frontend.
    const { email, password } = req.body;

    // SQL query to find user.
    const sql = "SELECT * FROM users WHERE email=?";

    // Run SQL query.
    db.query(sql, [email], async (err, result) => {

        // If database error comes.
        if (err) {

            // Print error.
            console.log(err);

            // Stop here.
            return res.send("Database Error");
        }

        // No user found.
        if (result.length === 0) {

            // Wrong email.
            return res.send("Invalid Email or Password");
        }

        // Save first user record.
        const user = result[0];

        // Compare entered password
        // with password stored in database.
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Password is correct.
        if (isMatch) {

            // Create login token.
            const token = jwt.sign(

                // Store user information
                // inside token.
                {
                    id: user.id,
                    email: user.email
                },

                // Secret key.
                SECRET_KEY,

                // Token will expire after 1 hour.
                {
                    expiresIn: "1h"
                }
            );

            // Print success message.
            console.log("LOGIN SUCCESS RESPONSE SENT");

            // Send message and token
            // to frontend.
            res.json({
                message: "Login successful ✔",
                token: token
            });

        } else {

            // Password is wrong.
            res.send("Invalid Email or Password");
        }

    });

});

// ========================
// ADD JOB
// ========================

// Create Add Job API.
// Only logged-in user can add a job.
app.post("/add-job", verifyToken, (req, res) => {

    // Get job details
    // sent from frontend.
    const { title, company, salary, location } = req.body;

    // SQL query to insert
    // new job into database.
    const sql =
        "INSERT INTO jobs(title,company,salary,location) VALUES(?,?,?,?)";

    // Run SQL query.
    db.query(

        // SQL command.
        sql,

        // Values to save
        // inside database.
        [title, company, salary, location],

        // Runs after query finishes.
        (err, result) => {

            // If database gives error.
            if (err) {

                // Print error.
                console.log(err);

                // Send error message.
                res.send("Error adding job");

            } else {

                // Job added successfully.
                res.send("Job added successfully ✔");
            }

        }

    );

});


// ========================
// GET ALL JOBS
// ========================

// Create Get Jobs API.
// Only logged-in user can see jobs.
app.get("/jobs", verifyToken, (req, res) => {

    // SQL query to get
    // all jobs from database.
    const sql = "SELECT * FROM jobs";

    // Run SQL query.
    db.query(sql, (err, result) => {

        // If database gives error.
        if (err) {

            // Print error.
            console.log(err);

            // Send error message.
            res.send("Error fetching jobs");

        } else {

            // Send all jobs
            // to frontend.
            res.json(result);
        }

    });

});


// ========================
// DELETE JOB
// ========================

// Create Delete API.
// :id means job id will come
// from frontend URL.
app.delete("/delete-job/:id", verifyToken, (req, res) => {

    // Get job id from URL.
    const id = req.params.id;

    // SQL query to delete
    // one job using id.
    const sql = "DELETE FROM jobs WHERE id=?";

    // Run SQL query.
    db.query(sql, [id], (err, result) => {

        // If database gives error.
        if (err) {

            // Print error.
            console.log(err);

            // Send error message.
            res.send("Error deleting job");

        } else {

            // Job deleted successfully.
            res.send("Job deleted successfully ✔");
        }

    });

});


// ========================
// UPDATE JOB
// ========================

// Create Update API.
// Used to edit job details.
app.put("/update-job/:id", verifyToken, (req, res) => {

    // Get job id from URL.
    const id = req.params.id;

    // Get updated values
    // from frontend.
    const { title, company, salary, location } = req.body;

    // SQL query to update job.
    const sql =
        "UPDATE jobs SET title=?, company=?, salary=?, location=? WHERE id=?";

    // Run SQL query.
    db.query(

        // SQL command.
        sql,

        // New values + job id.
        [title, company, salary, location, id],

        // Runs after query finishes.
        (err, result) => {

            // If database gives error.
            if (err) {

                // Print error.
                console.log(err);

                // Send error message.
                res.send("Error updating job");

            } else {

                // Job updated successfully.
                res.send("Job updated successfully ✔");
            }

        }

    );

});


// ========================
// START SERVER
// ========================

// Start backend server.
//
// 5000 is the port number.
//
// Callback function runs
// after server starts.
app.listen(5000, () => {

    // Print success message
    // in terminal.
    console.log("Server running on port 5000 🚀");

});