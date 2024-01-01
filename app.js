'use strict';

/* SETUP */
const express = require('express');
const app = express();

const fs = require('fs');

// Handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Static files
app.use(express.static('public'));

// Set a port
const PORT = process.env.PORT || 8081;

// Database connection
const db = require('./database/db-connector');

// Handlebars setup
const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');
const e = require('express');
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

/* ROUTES */
const departmentsRoute = require('./routes/departments.js');
const studentsRoute = require('./routes/students.js');
const coursesRoute = require('./routes/courses.js');
const coursesProfessors = require('./routes/professors.js');
const courseEnrollmentsRoute = require('./routes/courseenrollments.js');
const professorAssignmentsRoute = require('./routes/professorassignments.js');
const { error } = require('console');

app.use('/departments', departmentsRoute);
app.use('/students', studentsRoute);
app.use('/courses', coursesRoute);
app.use('/Professors', coursesProfessors);
app.use('/courseenrollments', courseEnrollmentsRoute);
app.use('/professorassignments', professorAssignmentsRoute);

// Index (home page)
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/reset-db', async (req, res) => {
    
    // Grab query to reset database from DDL.sql file
    const resetQuery = fs.readFileSync('./database/DDL.sql').toString();

    // Run reset query
    await db.pool.query(resetQuery);

    // Render the page
    res.render('index');
});

/* Catching errors */
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

/* LISTENER */
app.listen(PORT, () => {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});