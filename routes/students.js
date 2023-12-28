// Josh Jansen
// Josh Cantie

// Express
const express = require("express");
const router = express.Router();

// Database connection
const db = require('./../database/db-connector');

// CREATE
router.post('/', async (req, res) => {
    
    // Capture data
    let data = req.body;

    // Insert data with a query
    let query = `INSERT INTO Students (first_name, last_name, birthdate, home_planet, is_undergraduate, receives_financial_aid)
    VALUES ('${data.first_name}', '${data.last_name}', '${data.birthdate}', '${data.home_planet}', 
    '${data.is_undergraduate}', '${data.receives_financial_aid}')`;

    // Run the query
    try {
        await db.pool.query(query);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success
    res.redirect('/students');
});

// READ
router.get('/', async (req, res) => {
    
    let query = `SELECT Students.student_id AS 'Student ID', Students.first_name AS 'First Name',
    Students.last_name AS 'Last Name', Students.birthdate AS Birthdate, Students.home_planet AS 'Home Planet',
    CASE WHEN Students.is_undergraduate = 1 THEN 'Yes' ELSE 'No' END AS 'Is Undergraduate', 
    CASE WHEN Students.receives_financial_aid = 1 THEN 'Yes' ELSE 'No' END AS 'Receives Financial Aid'
    FROM Students;`;

    // Run the first query
    let rows;
    try {
        [rows] = await db.pool.query(query);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success

    // Format date objects
    for (let i = 0; i < rows.length; i++) {
        rows[i].Birthdate = rows[i].Birthdate.toLocaleDateString();
    }

    // Render page
    res.render('students', {data: rows});
});

// UPDATE
router.put('/', async (req, res, next) => {
    
    let data = req.body;

    let studentId = parseInt(data.id);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let birthdate = data.birthdate;
    let homePlanet = data.homePlanet;
    let isUndergraduate = data.isUndergraduate;
    let receivesFinancialAid = data.receivesFinancialAid;

    let updateStudentsQuery = `UPDATE Students SET 
                            first_name = ?, last_name = ?, 
                            birthdate = ?, home_planet = ?, 
                            is_undergraduate = ?, 
                            receives_financial_aid = ? 
                            WHERE student_id = ?;`;
    let resultsQuery = `SELECT * FROM Students WHERE student_id = ?;`;

    // Run the first query
    try {
        await db.pool.query(updateStudentsQuery, [firstName, lastName, birthdate, homePlanet, isUndergraduate, receivesFinancialAid, studentId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Run the second query
    let rows
    try {
        [rows] = await db.pool.query(resultsQuery, [studentId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Format date objects
    for (let i = 0; i < rows.length; i++) {
        rows[i].birthdate = rows[i].birthdate.toLocaleDateString();
    }

    res.send(rows);
});

// Populate Update Form
router.get('/populate', async (req, res) => {

    let query = `SELECT Students.student_id AS 'Student ID', Students.first_name AS 'First Name',
    Students.last_name AS 'Last Name', Students.birthdate AS Birthdate, Students.home_planet AS 'Home Planet',
    CASE WHEN Students.is_undergraduate = 1 THEN 'Yes' ELSE 'No' END AS 'Is Undergraduate', 
    CASE WHEN Students.receives_financial_aid = 1 THEN 'Yes' ELSE 'No' END AS 'Receives Financial Aid'
    FROM Students;`;

    // Run the query
    let rows
    try {
        [rows] = await db.pool.query(query);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success

    // Format date objects
    for (let i = 0; i < rows.length; i++) {
        rows[i].Birthdate = rows[i].Birthdate.toISOString().split('T')[0]
    }

    res.send(rows);
});

// DELETE
router.delete('/', async (req, res, next) => {

    let data = req.body;
    let studentID = parseInt(data.id);
    let deleteQuery = 'DELETE FROM Students WHERE student_id = ' + data.id;

    // Run the query
    let rows;
    try {
        [rows] = await db.pool.query(deleteQuery, [studentID]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success
    res.sendStatus(204);
});

// Export these routes
module.exports = router;