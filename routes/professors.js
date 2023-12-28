// Josh Jansen
// Josh Cantie

// Express
const express = require("express");
const router = express.Router();

// Citation for the following code:
// Date: 11/27/2023
// Adapted from a StackOverflow post.
// Adapted code from a post that demonstrated how to create a number formatting object to stylize currency.
// Source URL: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings

// Formatting for currency text
const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

// Database connection
const db = require('./../database/db-connector');

// CREATE
router.post('/', async (req, res) => {
    
    // Capture data
    let data = req.body;

    // Insert data with a query
    let query = `INSERT INTO Professors (department_id, first_name, last_name, birthdate, salary)
    VALUES ('${data.department_id}', '${data.first_name}', '${data.last_name}', '${data.birthdate}', 
    '${data.salary}');`;

    // Run the first query
    try {
        await db.pool.query(query);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success
    res.redirect('/professors');
});

// READ
router.get('/', async (req, res) => {
    
    let query1 = `SELECT Professors.professor_id AS 'Professor ID', Departments.department_name AS 'Department Name', 
    Professors.first_name AS 'First Name', Professors.last_name AS 'Last Name', 
    Professors.birthdate AS Birthdate, Professors.salary AS Salary
    FROM Professors
    JOIN Departments ON Departments.department_id = Professors.department_id;`;

    let query2 = `SELECT Departments.department_name AS 'Department Name', Departments.department_id AS 'Department ID' FROM Departments;`;

    // Run the first query
    let rows1;
    try {
        [rows1] = await db.pool.query(query1);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Run the second query
    let rows2;
    try {
        [rows2] = await db.pool.query(query2);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success

    // Format date objects
    for (let i = 0; i < rows1.length; i++) {
        rows1[i].Birthdate = rows1[i].Birthdate.toLocaleDateString();
    }

    // Format currency text
    for (let i = 0; i < rows1.length; i++) {
        rows1[i]['Salary'] = currencyFormat.format(rows1[i]['Salary']);
    }

    // Render page
    res.render('professors', {data: rows1, departments: rows2});
});

// UPDATE
router.put('/', async (req, res, next) => {
    
    let data = req.body;

    let professorId = parseInt(data.id);
    let departmentId = parseInt(data.departmenId);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let birthdate = data.birthdate;
    let salary = data.salary;

    let updateProfessorsQuery = `UPDATE Professors SET 
                            department_id = ?,
                            first_name = ?, last_name = ?, 
                            birthdate = ?, salary = ?
                            WHERE professor_id = ?;`;
    let resultsQuery = `SELECT Professors.professor_id, Departments.department_name AS 'Department Name', 
    Professors.first_name, Professors.last_name, Professors.birthdate, Professors.salary
    FROM Professors
    JOIN Departments ON Departments.department_id = Professors.department_id
    WHERE professor_id = ?`;

    // Run the first query (update)
    try {
        await db.pool.query(updateProfessorsQuery, [departmentId, firstName, lastName, birthdate, salary, professorId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Run the second query (results)
    let rows;
    try {
        [rows] = await db.pool.query(resultsQuery, [professorId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success

    // Format date objects
    for (let i = 0; i < rows.length; i++) {
        rows[i].birthdate = rows[i].birthdate.toLocaleDateString();
    }

    // Format currency text
    for (let i = 0; i < rows.length; i++) {
        rows[i]['Salary'] = currencyFormat.format(rows[i]['Salary']);
    }
    
    res.send(rows);
});

// Populate Update Form
router.get('/populate', async (req, res) => {

    let query = `SELECT Professors.professor_id AS 'Professor ID', Departments.department_name AS 'Department Name', 
    Professors.first_name AS 'First Name', Professors.last_name AS 'Last Name', 
    Professors.birthdate AS Birthdate, Professors.salary AS Salary,
    Departments.department_id AS 'Department ID'
    FROM Professors
    JOIN Departments ON Departments.department_id = Professors.department_id;`;

    // Run the query
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
        rows[i].Birthdate = rows[i].Birthdate.toISOString().split('T')[0]
    }

    res.send(rows);
});

// DELETE
router.delete('/', async (req, res, next) => {

    let data = req.body;
    let professorID = parseInt(data.id);
    let deleteQuery = 'DELETE FROM Professors WHERE professor_id = ' + data.id;

    try {
        await db.pool.query(deleteQuery, [professorID]);
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