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

    // Account for if the new course has a department of "null", i.e. a value of 0
    if (data.department_id === '0') {
        data.department_id = null;
    }

    // Define the query
    let query = `INSERT INTO Courses (department_id, course_name, credit_hours, course_description)
    VALUES (${data.department_id}, '${data.course_name}', '${data.credit_hours}', '${data.course_description}');`;

    // Run the query
    try {
        await db.pool.query(query);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success
    res.redirect('/courses')
});

// READ
router.get('/', async (req, res) => {

    let query1 = `SELECT Courses.course_id AS 'Course ID', Departments.department_name AS 'Department Name',
    Courses.course_name AS 'Course Name', Courses.credit_hours AS 'Credit Hours',
    Courses.course_description AS 'Course Description'
    FROM Courses
    LEFT JOIN Departments ON Departments.department_id = Courses.department_id;`;

    let query2 = `SELECT department_id as 'Department ID', department_name as 'Department Name' FROM Departments;`;

    // Run the first query
    let rows;
    try {
        [rows] = await db.pool.query(query1);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Run the second query
    let rows2
    try {
        [rows2] = await db.pool.query(query2);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success

    // Format NULL values
    for (let i = 0; i < rows.length; i++) {
        if (rows[i]['Department Name'] === null)
        {
            rows[i]['Department Name'] = 'NULL'
        }
    }

    // Render and send data
    res.render('courses', {data: rows, departments: rows2});
});

// UPDATE
router.put('/', async (req, res, next) => {
    
    let data = req.body;

    // Department ID
    let departmentId;
    if (parseInt(data.departmentId) === 0) {
        departmendId = "NULL";
    }
    else {
        departmentId = parseInt(data.departmentId);
    }

    // All other variables
    let courseId = parseInt(data.id);
    let courseName = data.courseName;
    let creditHours = data.creditHours;
    let courseDescription = data.courseDescription;

    let updateCoursesQuery = `UPDATE Courses SET 
                            department_id = ?,
                            course_name = ?, credit_hours = ?, 
                            course_description = ?
                            WHERE course_id = ?;`;
    let resultsQuery = `SELECT course_id, Departments.department_name AS 'Department Name', 
    course_name, credit_hours, course_description
    FROM Courses
    LEFT JOIN Departments ON Departments.department_id = Courses.department_id
    WHERE course_id = ?;`;

    // Run the first query
    try {
        await db.pool.query(updateCoursesQuery, [departmentId, courseName, creditHours, courseDescription, courseId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
    
    // Run the second query
    let rows
    try {
        [rows] = await db.pool.query(resultsQuery, [courseId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    res.send(rows);
});

// Populate Update Form
router.get('/populate', async (req, res) => {

    let query = `SELECT course_id AS 'Course ID', Departments.department_name AS 'Department Name', 
    course_name AS 'Course Name', credit_hours AS 'Credit Hours', 
    course_description AS 'Course Description',
    Departments.department_id AS 'Department ID'
    FROM Courses
    LEFT JOIN Departments ON Departments.department_id = Courses.department_id;`;

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
    res.send(rows);
});

// DELETE
router.delete('/', async (req, res, next) => {

    let data = req.body;
    let courseID = parseInt(data.id);
    let deleteQuery = 'DELETE FROM Courses WHERE course_id = ' + data.id;

    // Run the query
    let rows;
    try {
        [rows] = await db.pool.query(deleteQuery, [courseID]);
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