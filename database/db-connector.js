// Josh Jansen
// Josh Cantie

// Citation for the following code:
// Date: 11/14/2023
// Copied from Node.JS Starter App guide, Step 1
// No originality, just using the provided code to
//   connect to our SQL database.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

// MySQL instance
var mysql = require("mysql2");

// Connect to the database with proper credentials
var pool = mysql.createPool({
    connectionLimit     : 10,
    host                : 'spaceacademy.caagvoqensbn.us-east-2.rds.amazonaws.com',
    user                : 'jcantie3',
    password            : 'garchomp998',
    database            : 'spaceacademy',
    multipleStatements  : true
}).promise();

// Export the connection
module.exports.pool = pool;