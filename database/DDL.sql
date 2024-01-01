-- Josh Jansen
-- Josh Cantie

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -------------
-- Create Tables
-- -------------

-- Has M:N relationship with Courses which is facilitated by CourseEnrollments.
DROP TABLE Students;
CREATE TABLE Students (
  student_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(145) NOT NULL,
  last_name VARCHAR(145) NOT NULL,
  birthdate DATE NOT NULL,
  home_planet VARCHAR(145) NOT NULL,
  is_undergraduate TINYINT(1) NOT NULL DEFAULT 1,
  receives_financial_aid TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (student_id)
);

-- Has a 1:M relationship between Professors 
-- Has a 1:M relationship between Courses
DROP TABLE Departments;
CREATE TABLE Departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(145) NOT NULL,
  department_budget DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

-- Has a M:N relationship between Professors which is facilitated by ProfessorAssignments
-- Has a M:N relationship between Students which is facilitated by CourseEnrollments
-- Has a 1:M relationship between Departments
DROP TABLE Courses;
CREATE TABLE Courses (
  course_id INT NOT NULL AUTO_INCREMENT,
  department_id INT,
  course_name VARCHAR(145) NOT NULL,
  credit_hours INT NOT NULL,
  course_description TEXT NULL,
  PRIMARY KEY (course_id),
  FOREIGN KEY (department_id) 
    REFERENCES Departments (department_id)
		ON DELETE SET NULL
);

-- Facilitates a M:N relationship between Studenets and Courses
DROP TABLE CourseEnrollments; 
CREATE TABLE CourseEnrollments (
  course_enrollment_id INT NOT NULL AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (course_enrollment_id),
  FOREIGN KEY (student_id)
    REFERENCES Students (student_id)
	ON DELETE CASCADE,
  FOREIGN KEY (course_id)
    REFERENCES Courses (course_id)
		ON DELETE CASCADE
);

-- Has a M:N relationship between Courses which is facilitated by ProfessorAssignments
-- Has a 1:M relationship between Departments 
DROP TABLE Professors;
CREATE TABLE Professors (
  professor_id INT NOT NULL AUTO_INCREMENT,
  department_id INT NOT NULL,
  first_name VARCHAR(145) NOT NULL,
  last_name VARCHAR(145) NOT NULL,
  birthdate DATE NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (professor_id),
  FOREIGN KEY (department_id)
    REFERENCES Departments (department_id)
		ON DELETE CASCADE
);

-- Facilitates a M:N relationship between Professors and Courses
DROP TABLE ProfessorAssignments; 
CREATE TABLE ProfessorAssignments (
  professor_assignment_id INT NOT NULL AUTO_INCREMENT,
  professor_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (professor_assignment_id),
  FOREIGN KEY (professor_id)
    REFERENCES Professors (professor_id)
		ON DELETE CASCADE,
  FOREIGN KEY (course_id)
    REFERENCES Courses (course_id)
		ON DELETE CASCADE
);

-- -----------------
-- Insert statements
-- -----------------

-- Insert values for the Students table
INSERT INTO Students (first_name, last_name, birthdate, home_planet, is_undergraduate, receives_financial_aid)
VALUES
(
	'Jordan',
	'Watkins',
	'2004-11-20', 
	'Mars', 
	1, 
	1
),
(
	'Lionel', 
	'Gardener',
	'1999-08-17',
	'Jupiter', 
	0, 
	0
),
(
	'Jessica', 
	'Smith',
	'1996-04-01', 
	'Jupiter',
	0, 
	1
),
(
	'Portia',
	'Johnson', 
	'2005-07-11', 
	'Earth', 
	1, 
	0
);

-- Insert values for the Departments table
INSERT INTO Departments (department_name, department_budget)
VALUES
(
	'Space Combat', 
	500000
),
(
	'Space Biology',
	250000
),
(
	'Space Economics', 
	750000
);

-- Insert values for the Courses table
INSERT INTO Courses (department_id, course_name, credit_hours, course_description)
VALUES
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Combat"),
	'Space Archery',
	4,
	'A class for teaching students archery as it pertains to space combat.'
),
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Combat"),
	'Space Fencing',
	3,
	'A class for teaching students how to fence in low-gravity scenarios.'
),
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Biology"),
	'Intergalactic Microbes',
	4,
	'An exploratory course on microbiotic lifeforms found across the galaxy.'
),
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Economics"),
	'Solar System Microeconomics',
	4,
	'A course on interplanetary microeconomic theory in our solar system.'
),
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Economics"),
	'Economic Theory of Neptune',
	3,
	'An essay-based course exploring the unique economy of Neptune.'
);

-- Insert values for the CourseEnrollments table
INSERT INTO CourseEnrollments (student_id, course_id)
VALUES
(
	(SELECT student_id FROM Students WHERE first_name = "Jordan" AND last_name = "Watkins"),
	(SELECT course_id FROM Courses WHERE course_name = "Space Archery")
),
(
	(SELECT student_id FROM Students WHERE first_name = "Jordan" AND last_name = "Watkins"),
	(SELECT course_id FROM Courses WHERE course_name = "Intergalactic Microbes")
),
(
	(SELECT student_id FROM Students WHERE first_name = "Lionel" AND last_name = "Gardener"),
	(SELECT course_id FROM Courses WHERE course_name = "Space Archery")
),
(
	(SELECT student_id FROM Students WHERE first_name = "Jessica" AND last_name = "Smith"),
	(SELECT course_id FROM Courses WHERE course_name = "Space Fencing")
),
(
	(SELECT student_id FROM Students WHERE first_name = "Portia" AND last_name = "Johnson"),
	(SELECT course_id FROM Courses WHERE course_name = "Economic Theory of Neptune")
),
(
	(SELECT student_id FROM Students WHERE first_name = "Portia" AND last_name = "Johnson"),
	(SELECT course_id FROM Courses WHERE course_name = "Solar System Microeconomics")
);

-- Insert values for the Professors table
INSERT INTO Professors (department_id, first_name, last_name, birthdate, salary)
VALUES
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Combat"),
	'George',
	'Galactica',
	'1963-01-07',
	70000.00
),
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Combat"),
	'Victor',
	'Lorentz',
	'1972-09-05',
	72000.00
),
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Biology"),
	'Rachel',
	'Carmichael',
	'1984-04-16',
	85000.00
),
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Economics"),
	'Irving',
	'Wilder',
	'1990-06-11',
	60000.00
),
(
	(SELECT department_id FROM Departments WHERE department_name = "Space Economics"),
	'Paul',
	'Morton',
	'1945-10-19',
	60000.00
);

-- Insert values for the ProfessorAssignments table
INSERT INTO ProfessorAssignments (professor_id, course_id)
VALUES
(
	(SELECT professor_id FROM Professors WHERE first_name = "Rachel" AND last_name = "Carmichael"),
	(SELECT course_id FROM Courses WHERE course_name = "Intergalactic Microbes")
),
(
	(SELECT professor_id FROM Professors WHERE first_name = "Paul" AND last_name = "Morton"),
	(SELECT course_id FROM Courses WHERE course_name = "Solar System Microeconomics")
),
(
	(SELECT professor_id FROM Professors WHERE first_name = "George" AND last_name = "Galactica"),
	(SELECT course_id FROM Courses WHERE course_name = "Space Archery")
),
(
	(SELECT professor_id FROM Professors WHERE first_name = "George" AND last_name = "Galactica"),
	(SELECT course_id FROM Courses WHERE course_name = "Space Fencing")
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;