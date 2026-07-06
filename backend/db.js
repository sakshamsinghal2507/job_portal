//importing mysql library...this allows Node.js to talk with database
const mysql = require("mysql2");

//we are creating connection to database...'db' is the name of the connection
const db = mysql.createConnection({
    //your own computer..MySQL is running in your system
    host: "localhost",
    //default MySQL username in XAMPP
    user: "root",
    //XAMPP has no password by default...so empty
    password: "",
    //database name you created in phpMyAdmin
    database: "job_portal"
});

//try to connect to database..if error->show err msg and if success->show success msg
db.connect((err) => {
    if (err) {
        console.log("❌ Database connection failed");
        console.log(err);
    } else {
        console.log("✅ Database connected successfully");
    }
});

//IMP- we are exporting db connection so we can use it in other files like-sever.js
module.exports = db;