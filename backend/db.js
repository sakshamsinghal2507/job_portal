// Bring mysql2 library.
// It helps Node.js talk to MySQL database.
const mysql = require("mysql2");

// Create connection with database.
const db = mysql.createConnection({

    // Database address.
    host: process.env.DB_HOST,

    // Database username.
    user: process.env.DB_USER,

    // Database password.
    password: process.env.DB_PASSWORD,

    // Database name.
    database: process.env.DB_NAME,

    // Database port.
    port: process.env.DB_PORT,

    // Aiven requires SSL connection.
    ssl: {
        rejectUnauthorized: false
    }
});

// Try connecting to database.
db.connect((err) => {

    if (err) {
        console.log("❌ Database connection failed");
        console.log(err);
    } else {
        console.log("✅ Database connected successfully");
    }
});

// Export database connection.
module.exports = db;