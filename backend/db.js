// We are bringing the mysql2 library.
// Think of this like bringing a translator.
// Our Node.js speaks JavaScript and MySQL speaks SQL.
// mysql2 helps both understand each other.
const mysql = require("mysql2");


// Now we are making a connection with our database.
// Think of this like making a phone call to your friend.
// Before talking, you must know your friend's phone number.
const db = mysql.createConnection({

    // This is the address of our database.
    // Just like every house has an address,
    // every database also has an address.
    // Render/Aiven gives this address.
    host: process.env.DB_HOST,

    // This is the username of the database.
    // Just like you enter your username while logging into Gmail,
    // the database also asks, "Who are you?"
    user: process.env.DB_USER,

    // This is the password of the database.
    // Just like your room has a lock,
    // only people with the correct password can enter.
    password: process.env.DB_PASSWORD,

    // This tells which database we want to use.
    // Imagine a school has many classrooms.
    // We are telling Node.js which classroom (database) to enter.
    database: process.env.DB_NAME,

    // Port is like the gate number of a building.
    // If no gate number is given,
    // MySQL automatically uses gate number 3306.
    port: process.env.DB_PORT || 3306
});


// Now Node.js tries to talk to the database.
// Like saying "Hello, can we connect?"
db.connect((err) => {

    // If something goes wrong while connecting...
    if (err) {

        // Show a simple message.
        console.log("❌ Database connection failed");

        // Also show the real error.
        // This helps us know exactly what went wrong.
        console.log(err);

    } else {

        // If everything is correct...
        // Tell us the connection is successful.
        console.log("✅ Database connected successfully");
    }
});


// Finally, we are sharing this database connection.
// Think of this like giving your house key
// to trusted family members.
// Now other files like server.js can also use this connection.
module.exports = db;