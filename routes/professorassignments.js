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
    let query = `INSERT INTO ProfessorAssignments (professor_id, course_id)
    VALUES ('${data.professor_id}', '${data.course_id}');`;

    // Run the first query
    try {
        await db.pool.query(query);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Success
    res.redirect('/professorassignments');
});

// READ
router.get('/', async (req, res) => {

    const query1 = `SELECT ProfessorAssignments.professor_assignment_id AS 'Professor Assignment ID',
    CONCAT(Professors.first_name, " ", Professors.last_name) AS 'Professor Name', Courses.course_name AS 'Course Name'
    FROM ProfessorAssignments
    JOIN Professors ON Professors.professor_id = ProfessorAssignments.professor_id 
    JOIN Courses ON Courses.course_id = ProfessorAssignments.course_id;`

    const query2 = `SELECT CONCAT(Professors.first_name, " ", Professors.last_name) AS 'Professor Name', professor_id as 'Professor ID' FROM Professors;`;

    const query3 = `SELECT course_name as 'Course Name', course_id as 'Course ID' FROM Courses;`;

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

    // Run the third query
    let rows3;
    try {
        [rows3] = await db.pool.query(query3);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

    // Render page and send data
    res.render('professorassignments', {data: rows1, professors: rows2, courses: rows3});
});

// UPDATE
router.put('/', async (req, res, next) => {
    
    let data = req.body;

    let professorAssignmentId = parseInt(data.id);
    let professorId = parseInt(data.professorId);
    let courseId = parseInt(data.courseId);

    let updateQuery = `UPDATE ProfessorAssignments 
        SET professor_id = ?, course_id = ? 
        WHERE professor_assignment_id = ?;`;
    let resultsQuery = `SELECT ProfessorAssignments.professor_assignment_id AS 'Professor Assignment ID', 
        CONCAT(Professors.first_name, " ", Professors.last_name) AS 'Professor Name', Courses.course_name AS 'Course Name',
        Professors.professor_id AS 'Professor ID', Courses.course_id AS 'Course ID'
        FROM ProfessorAssignments
        JOIN Professors ON ProfessorAssignments.professor_id = Professors.professor_id
        JOIN Courses ON ProfessorAssignments.course_id = Courses.course_id
        WHERE professor_assignment_id = ?;`;

    // Run the first query
    try {
        await db.pool.query(updateQuery, [professorId, courseId, professorAssignmentId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
    
    // Run the second query
    let rows;
    try {
        [rows] = await db.pool.query(resultsQuery, [professorAssignmentId]);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
    
    // Success

    // Render the page
    res.send(rows);
});

// Populate Update Form
router.get('/populate', async (req, res) => {

    let query = `SELECT ProfessorAssignments.professor_assignment_id AS 'Professor Assignment ID',
    CONCAT(Professors.first_name, " ", Professors.last_name) AS 'Professor Name', Courses.course_name AS 'Course Name',
    Professors.professor_id AS 'Professor ID', Courses.course_id AS 'Course ID'
    FROM ProfessorAssignments
    JOIN Professors ON Professors.professor_id = ProfessorAssignments.professor_id 
    JOIN Courses ON Courses.course_id = ProfessorAssignments.course_id;`;

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
    res.send(rows);
});

// DELETE
router.delete('/', async (req, res, next) => {

    let data = req.body;
    let professorAssignmentID = parseInt(data.id);
    let deleteQuery = 'DELETE FROM ProfessorAssignments WHERE professor_assignment_id = ' + data.id;

    // Run the delete query
    try {
        await db.pool.query(deleteQuery, [professorAssignmentID]);
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