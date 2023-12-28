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

const db = require('./../database/db-connector');

// CREATE
router.post('/', async (req, res) => {
    
    // Capture data
    let data = req.body;

    // Insert data with a query
    let query1 = `INSERT INTO Departments (department_name, department_budget) VALUES ('${data.department_name}', '${data.department_budget}')`;

    // Run the first query
    try {
        await db.pool.query(query1);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success
    res.redirect('/departments');
});

// READ
router.get('/', async (req, res) => {

    let query1 = `SELECT Departments.department_id AS "Department ID",
    Departments.department_name AS "Department Name",
    Departments.department_budget AS "Department Budget" FROM Departments;`;

    // Run the first query
    let rows;
    try {
        [rows] = await db.pool.query(query1);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success

    // Format currency text
    for (let i = 0; i < rows.length; i++) {
        rows[i]['Department Budget'] = currencyFormat.format(rows[i]['Department Budget']);
    }

    res.render('departments', {data: rows});
});

// UPDATE
router.put('/', async (req, res, next) => {

    let data = req.body;

    let departmentId = parseInt(data.id);
    let departmentName = data.departmentName;
    let departmentbudget = data.departmentBudget;

    let updateDepartmentQuery = `UPDATE Departments SET 
                                    department_name = ?,
                                    department_budget = ?
                                    WHERE department_id = ?;`;
    let resultsQuery = `SELECT * FROM Departments WHERE department_id = ?;`;
    
    // Run the first query
    try {
        await db.pool.query(updateDepartmentQuery, [departmentName, departmentbudget, departmentId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Run the second query
    let rows;
    try {
        [rows] = await db.pool.query(resultsQuery, [departmentId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success
    res.send(rows);
});

// Populate Update Form
router.get('/populate', async (req, res) => {

    let query = `SELECT Departments.department_id AS "Department ID",
    Departments.department_name AS "Department Name",
    Departments.department_budget AS "Department Budget" 
    FROM Departments;`;

    let rows;
    try {
        [rows] = await db.pool.query(query);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success
    res.send(rows);

});

// DELETE
router.delete('/', async (req, res, next) => {

    let data = req.body;
    let departmentID = parseInt(data.id);
    let deleteQuery = 'DELETE FROM Departments WHERE department_id = ' + data.id;

    // First query
    try {
        await db.pool.query(deleteQuery, [departmentID]);
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