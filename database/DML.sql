-- Josh Jansen
-- Josh Cantie

-- Citation for the following queries
-- Date: 10/29/2023
-- Adapted from sample SQL queries on Project Step 3 Draft Version page
-- Used basic structure and modified with values for our database
-- Source URL: https://canvas.oregonstate.edu/courses/1933532/assignments/9297505

--------------
-- Students --
--------------

-- READ
-- Get all the students and their attributes to populate the table on the Students page
SELECT Students.student_id AS 'Student ID', Students.first_name AS 'First Name',
Students.last_name AS 'Last Name', Students.birthdate AS Birthdate, Students.home_planet AS 'Home Planet',
CASE WHEN Students.is_undergraduate = 1 THEN 'Yes' ELSE 'No' END AS 'Is Undergraduate', 
CASE WHEN Students.receives_financial_aid = 1 THEN 'Yes' ELSE 'No' END AS 'Receives Financial Aid'
FROM Students;

-- CREATE
-- Add a new student into the Students table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
INSERT INTO Students (first_name, last_name, birthdate, home_planet, is_undergraduate, receives_financial_aid)
VALUES (:first_name_input, :last_name_input, :birthdate_input, :home_planet_input, :is_undergraduate_input, :receives_financial_aid_input);

-- UPDATE
-- Update a student in the Students table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
UPDATE Students
SET first_name = :first_name_input,
	last_name = :last_name_input,
	birthdate = :birthdate_input,
	home_planet = :home_planet_input,
	is_undergraduate = :is_undergraduate_input,
	receives_financial_aid = :receives_financial_aid_input
WHERE student_id = :student_id_from_html_table;

-- UPDATE
-- A query used to display results on the page after updating the Students table in the database.
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
SELECT * FROM Students WHERE student_id = :student_id_from_html_table;

-- UPDATE
-- A query used to auto-fill information into the "edit Students" web form when updating a row in the table.
SELECT Students.student_id AS 'Student ID', Students.first_name AS 'First Name',
Students.last_name AS 'Last Name', Students.birthdate AS Birthdate, Students.home_planet AS 'Home Planet',
CASE WHEN Students.is_undergraduate = 1 THEN 'Yes' ELSE 'No' END AS 'Is Undergraduate', 
CASE WHEN Students.receives_financial_aid = 1 THEN 'Yes' ELSE 'No' END AS 'Receives Financial Aid'
FROM Students;

-- DELETE
-- Delete a student from the Students table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
DELETE FROM Students WHERE student_id = :student_id_from_html_table;

-----------------
-- Departments --
-----------------

-- READ
-- Get all the departments and their attributes to populate the table on the Departments page
SELECT Departments.department_id AS "Department ID",
Departments.department_name AS "Department Name",
Departments.department_budget AS "Department Budget"
FROM Departments;

-- CREATE
-- Add a new department into the Departments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
INSERT INTO Departments (department_name, department_budget)
VALUES (:department_name_input, :department_budget_input);

-- UPDATE
-- Update a department in the Departments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
UPDATE Departments
SET department_name = :department_name_input,
	department_budget = :department_budget_input
WHERE department_id = :department_id_from_html_table;

-- UPDATE
-- A query used to display results on the page after updating the Departments table in the database.
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
SELECT * FROM Departments WHERE department_id = :department_id_from_html_table;

-- UPDATE
-- A query used to auto-fill information into the "edit Departments" web form when updating a row in the table.
SELECT Departments.department_id AS "Department ID",
Departments.department_name AS "Department Name",
Departments.department_budget AS "Department Budget" 
FROM Departments;

-- DELETE
-- Delete a department from the Departments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
DELETE FROM Departments WHERE department_id = :department_id_from_html_table;

-------------
-- Courses --
-------------

-- READ
-- Get all the courses and their attributes to populate the table on the Courses page
-- Show the department name instead of the department ID, for ease of use for end users.
SELECT Courses.course_id AS 'Course ID', Departments.department_name AS 'Department Name',
Courses.course_name AS 'Course Name', Courses.credit_hours AS 'Credit Hours',
Courses.course_description AS 'Course Description'
FROM Courses
LEFT JOIN Departments ON Departments.department_id = Courses.department_id;

-- READ
-- Additional query used for Courses page that will show the Department the course falls under as a department name 
-- instead of a foreign key
SELECT department_id as 'Department ID', department_name as 'Department Name' FROM Departments;

-- CREATE
-- Add a new course into the Courses table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
INSERT INTO Courses (department_id, course_name, credit_hours, course_description)
VALUES (:department_id_input, :course_name_input, :credit_hours_input, :course_description_input);

-- UPDATE
-- Update a course in the Courses table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
UPDATE Courses
SET department_id = :department_id_input,
    course_name = :course_name_input,
    credit_hours = :credit_hours_input,
    course_description = :course_description_input
WHERE course_id = :course_id_from_html_table;

-- UPDATE
-- A query used to display results on the page after updating the Courses table in the database.
SELECT course_id, Departments.department_name AS 'Department Name', course_name, credit_hours, course_description
FROM Courses
JOIN Departments ON Departments.department_id = Courses.department_id;

-- UPDATE
-- A query used to auto-fill information into the "edit Courses" web form when updating a row in the table.
SELECT course_id AS 'Course ID', Departments.department_name AS 'Department Name', 
course_name AS 'Course Name', credit_hours AS 'Credit Hours', 
course_description AS 'Course Description',
Departments.department_id AS 'Department ID'
FROM Courses
JOIN Departments ON Departments.department_id = Courses.department_id;

-- DELETE
-- Delete a course from the Courses table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
DELETE FROM Courses WHERE course_id = :course_id_from_html_table;

-----------------------
-- CourseEnrollments --
-----------------------

-- READ
-- Get all the course enrollments and their attributes to populate the table on the CourseEnrollments page
SELECT CourseEnrollments.course_enrollment_id AS 'Course Enrollment ID', 
CONCAT(Students.first_name, " ", Students.last_name) AS 'Student Name', Courses.course_name AS 'Course Name'
FROM CourseEnrollments
JOIN Students ON CourseEnrollments.student_id = Students.student_id
JOIN Courses ON CourseEnrollments.course_id = Courses.course_id;

-- READ
-- Additional queries used for CourseEnrollments page that will show the student name and course name instead of foreign keys
SELECT CONCAT(Students.first_name, " ", Students.last_name) AS 'Student Name', student_id as 'Student ID' FROM Students;
SELECT course_name as 'Course Name', course_id as 'Course ID' FROM Courses;

-- CREATE
-- Add a new course enrollment into the CourseEnrollments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
INSERT INTO CourseEnrollments (student_id, course_id)
VALUES (:student_id_input, :course_id_input);

-- UPDATE
-- Update a course enrollment in the CourseEnrollments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
UPDATE CourseEnrollments
SET student_id = :student_id_input,
    course_id = :course_id_input
WHERE course_enrollment_id = :course_enrollment_id_from_html_table;

-- UPDATE
-- A query used to display results on the page after updating the CourseEnrollments table in the database.
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
SELECT CourseEnrollments.course_enrollment_id AS 'Course Enrollment ID', 
CONCAT(Students.first_name, " ", Students.last_name) AS 'Student Name', Courses.course_name AS 'Course Name',
Students.student_id AS 'Student ID', Courses.course_id AS 'Course ID'
FROM CourseEnrollments
JOIN Students ON CourseEnrollments.student_id = Students.student_id
JOIN Courses ON CourseEnrollments.course_id = Courses.course_id
WHERE course_enrollment_id = :course_enrollment_id_from_html_table;

-- UPDATE
-- A query used to auto-fill information into the "edit CourseEnrollments" web form when updating a row in the table.
SELECT CourseEnrollments.course_enrollment_id AS 'Course Enrollment ID', 
CONCAT(Students.first_name, " ", Students.last_name) AS 'Student Name', Courses.course_name AS 'Course Name',
Students.student_id AS 'Student ID', Courses.course_id AS 'Course ID'
FROM CourseEnrollments
JOIN Students ON CourseEnrollments.student_id = Students.student_id
JOIN Courses ON CourseEnrollments.course_id = Courses.course_id;

-- DELETE
-- Delete a course enrollment from the CourseEnrollments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
DELETE FROM CourseEnrollments WHERE course_enrollment_id = :course_enrollment_id_from_html_table;

----------------
-- Professors --
----------------

-- READ
-- Get all the professors and their attributes to populate the table on the Professors page
-- Show the department name instead of the department ID, for ease of use for end users.
SELECT Professors.professor_id AS 'Professor ID', Departments.department_name AS 'Department Name', 
Professors.first_name AS 'First Name', Professors.last_name AS 'Last Name', 
Professors.birthdate AS Birthdate, Professors.salary AS Salary
FROM Professors
JOIN Departments ON Departments.department_id = Professors.department_id;

-- READ
-- Additional query used for Professors page that will show the department name instead of a foreign key
SELECT Departments.department_name AS 'Department Name', Departments.department_id AS 'Department ID' FROM Departments;

-- CREATE
-- Add a new professor into the Professors table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
INSERT INTO Professors (department_id, first_name, last_name, birthdate, salary)
VALUES (:department_id_input, :first_name_input, :last_name_input, :birthdate_input, :salary_input);

-- UPDATE
-- Update a professor in the Professors table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
UPDATE Professors
SET department_id = :department_id_input,
    first_name = :first_name_input,
    last_name = :last_name_input,
    birthdate = :birthdate_input,
    salary = :salary_input
WHERE professor_id = :professor_id_from_html_table;

-- UPDATE
-- A query used to display results on the page after updating the Professors table in the database.
SELECT Professors.professor_id, Departments.department_name AS 'Department Name', 
Professors.first_name, Professors.last_name, Professors.birthdate, Professors.salary
FROM Professors
JOIN Departments ON Departments.department_id = Professors.department_id;

-- UPDATE
-- A query used to auto-fill information into the "edit Professors" web form when updating a row in the table.
SELECT Professors.professor_id AS 'Professor ID', Departments.department_name AS 'Department Name', 
Professors.first_name AS 'First Name', Professors.last_name AS 'Last Name', 
Professors.birthdate AS Birthdate, Professors.salary AS Salary,
Departments.department_id AS 'Department ID'
FROM Professors
JOIN Departments ON Departments.department_id = Professors.department_id;

-- DELETE
-- Delete a professor from the Professors table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
DELETE FROM Professors WHERE professor_id = :professor_id_from_html_table;

--------------------------
-- ProfessorAssignments --
--------------------------

-- READ
-- Get all the professor assignments and their attributes to populate the table on the ProfessorAssignments page
-- Show the professor name instead of the professor ID and the course name instead of the course ID, for ease of use for end users
SELECT ProfessorAssignments.professor_assignment_id AS 'Professor Assignment ID',
CONCAT(Professors.first_name, " ", Professors.last_name) AS 'Professor Name', Courses.course_name AS 'Course Name'
FROM ProfessorAssignments
JOIN Professors ON Professors.professor_id = ProfessorAssignments.professor_id 
JOIN Courses ON Courses.course_id = ProfessorAssignments.course_id;

-- READ
-- Additional queries used for ProfessorAssignments page that will show the professor name and course name instead of foreign keys
SELECT CONCAT(Professors.first_name, " ", Professors.last_name) AS 'Professor Name', professor_id as 'Professor ID' FROM Professors;
SELECT course_name as 'Course Name', course_id as 'Course ID' FROM Courses;

-- CREATE
-- Add a new professor assignment into the ProfessorAssignments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
INSERT INTO ProfessorAssignments (professor_id, course_id)
VALUES (:professor_id_input, :course_id_input);

-- UPDATE
-- Update a professor assignment in the ProfessorAssignments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
UPDATE ProfessorAssignments
SET professor_id = :professor_id_input,
    course_id = :course_id_input
WHERE professor_assignment_id = :professor_assignment_id_from_html_table;

-- UPDATE
-- A query used to display results on the page after updating the ProfessorAssignments table in the database.
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
SELECT ProfessorAssignments.professor_assignment_id AS 'Professor Assignment ID', 
CONCAT(Professors.first_name, " ", Professors.last_name) AS 'Professor Name', Courses.course_name AS 'Course Name',
Professors.professor_id AS 'Professor ID', Courses.course_id AS 'Course ID'
FROM ProfessorAssignments
JOIN Professors ON ProfessorAssignments.professor_id = Professors.professor_id
JOIN Courses ON ProfessorAssignments.course_id = Courses.course_id
WHERE professor_assignment_id = :professor_assignment_id_from_html_table;

-- UPDATE
-- A query used to auto-fill information into the "edit ProfessorAssignments" web form when updating a row in the table.
SELECT ProfessorAssignments.professor_assignment_id AS 'Professor Assignment ID',
CONCAT(Professors.first_name, " ", Professors.last_name) AS 'Professor Name', Courses.course_name AS 'Course Name',
Professors.professor_id AS 'Professor ID', Courses.course_id AS 'Course ID'
FROM ProfessorAssignments
JOIN Professors ON Professors.professor_id = ProfessorAssignments.professor_id 
JOIN Courses ON Courses.course_id = ProfessorAssignments.course_id;

-- DELETE
-- Delete a professor assignment from the ProfessorAssignments table
-- Variables that will be provided from the backend are denoted with a colon prefix (:)
DELETE FROM ProfessorAssignments WHERE professor_assignment_id = :professor_assignment_id_from_html_table;