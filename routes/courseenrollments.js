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
    let query = `INSERT INTO CourseEnrollments (student_id, course_id)
    VALUES ('${data.student_id}', '${data.course_id}');`;

    await db.pool.query(query);

    res.redirect('/courseenrollments');
});

// READ
router.get('/', async (req, res) => {

    let query1 = `SELECT CourseEnrollments.course_enrollment_id AS 'Course Enrollment ID', 
    CONCAT(Students.first_name, " ", Students.last_name) AS 'Student Name', Courses.course_name AS 'Course Name'
    FROM CourseEnrollments
    JOIN Students ON CourseEnrollments.student_id = Students.student_id
    JOIN Courses ON CourseEnrollments.course_id = Courses.course_id;`;

    let query2 = `SELECT CONCAT(Students.first_name, " ", Students.last_name) AS 'Student Name', student_id as 'Student ID' FROM Students;`;

    let query3 = `SELECT course_name as 'Course Name', course_id as 'Course ID' FROM Courses;`;

    // Run 3 queries and collect data
    const [rows] = await db.pool.query(query1);
    const [rows2] = await db.pool.query(query2);
    const [rows3] = await db.pool.query(query3);

    res.render('courseenrollments', {data: rows, students: rows2, courses: rows3});
});

// UPDATE
router.put('/', async (req, res, next) => {
    
    let data = req.body;

    let courseEnrollmentId = parseInt(data.id);
    let studentId = parseInt(data.studentId);
    let courseId = parseInt(data.courseId);

    let updateQuery = `UPDATE CourseEnrollments 
        SET student_id = ?, course_id = ? 
        WHERE course_enrollment_id = ?;`;
    let resultsQuery = `SELECT CourseEnrollments.course_enrollment_id AS 'Course Enrollment ID', 
        CONCAT(Students.first_name, " ", Students.last_name) AS 'Student Name', Courses.course_name AS 'Course Name',
        Students.student_id AS 'Student ID', Courses.course_id AS 'Course ID'
        FROM CourseEnrollments
        JOIN Students ON CourseEnrollments.student_id = Students.student_id
        JOIN Courses ON CourseEnrollments.course_id = Courses.course_id
        WHERE course_enrollment_id = ?;`;

    // Run 2 queries and collect data
    await db.pool.query(updateQuery, [studentId, courseId, courseEnrollmentId]);
    const [rows] = await db.pool.query(resultsQuery, [courseEnrollmentId]);
    res.send(rows);
});

// Populate Update Form
router.get('/populate', async (req, res) => {

    let query = `SELECT CourseEnrollments.course_enrollment_id AS 'Course Enrollment ID', 
    CONCAT(Students.first_name, " ", Students.last_name) AS 'Student Name', Courses.course_name AS 'Course Name',
    Students.student_id AS 'Student ID', Courses.course_id AS 'Course ID'
    FROM CourseEnrollments
    JOIN Students ON CourseEnrollments.student_id = Students.student_id
    JOIN Courses ON CourseEnrollments.course_id = Courses.course_id;`;

    const [rows] = await db.pool.query(query);

    res.send(rows);
});

// DELETE
router.delete('/', async (req, res, next) => {

    let data = req.body;
    let courseEnrollmentID = parseInt(data.id);
    let deleteQuery = 'DELETE FROM CourseEnrollments WHERE course_enrollment_id = ' + data.id;

    await db.pool.query(deleteQuery, [courseEnrollmentID]);

    // Successful
    res.sendStatus(204);
});

// Export these routes
module.exports = router;