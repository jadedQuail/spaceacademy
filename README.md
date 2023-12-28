# Space Academy

This is a web application and database for a theoretical university in outer space, which will hopefully one day become a reality for the sole purpose of me then being able to make an accompanying database.

## URL

http://spaceacademy.us-east-2.elasticbeanstalk.com/

## Project Outline

Space Academy is an institution of higher learning that serves 10,000 of the brightest undergraduate students from various planets in the solar system. The university offers 500 courses across 24 different departments and has 200 professors on staff. A website with a database can help keep track of the various courses, the students that are in those courses, which professors teach those courses, and which departments these teachers and courses fall under. 

Amongst other needs, it is critical that Space Academy has records that keep track of student enrollments into classes, so that the institution can track which courses a student has completed and how they are progressing towards a degree and graduation. It is also critical that professors and courses be organized into their proper departments, so that a department’s course catalog can be browsed and professors can be assigned and accounted for.

## Database Outline

- Students: records details of Students who are enrolled at Space Academy.
	- student_id: int, auto_increment, not NULL, PK
	- home_planet: varchar(145), not NULL
	- is_undergraduate: tinyint, not NULL, default 1
	- first_name: varchar(145), not NULL
	- last_name: varchar(145), not NULL
	- birthdate: date, not NULL
	- receives_financial_aid: tinyint, not NULL, default 0
	- Relationship: 
		- M:N relationship exists between Students and Courses, which will be facilitated by an intersection table CourseEnrollments
		
- Courses: records details of Courses available for Students to enroll in at Space Academy.
	- course_id: int, auto_increment, not NULL, PK
	- department_id: int, FK
	- course_name: varchar(145), not NULL
	- course_description: text
	- credit_hours: int, not NULL
	- Relationship: 
		- M:N relationship exists between Professors and Courses, which is facilitated by an intersection table ProfessorAssignments.
		- 1:M relationship exists between Departments and Courses, which is implemented with department_id as a FK inside of Courses.
		- M:N relationship exists between Students and Courses, which will be facilitated by an intersection table CourseEnrollments.

- CourseEnrollments: intersection table that facilitates the M:N relationship between Students and Courses.
	- course_enrollment_id: int, auto_increment, not NULL, PK
	- course_id: int, not NULL, FK 
	- student_id: int, not NULL, FK
	- Relationship: 
		- Facilitates M:N relationship between Students and Courses
		
- Professors: records details of Professors who teach Courses.
	- professor_id: int, auto_increment, not NULL, PK
	- department_id: int, not NULL, FK
	- first_name: varchar(145), not NULL
	- last_name: varchar(145), not NULL
	- birthdate: date, not NULL
	- salary: decimal(10,2), not NULL
	- Relationship: 
		- 1:M relationship exists between Departments and Professors, which is implemented with department_id as a FK inside of Professors.
		- M:N relationship exists between Professors and Courses, which is facilitated by an intersection table ProfessorAssignments.

- ProfessorAssignments: intersection table that facilitates the M:N relationship between Professors and Courses.
	- professor_assignment_id: int, auto_increment, not NULL, PK
	- professor_id: int, not NULL, FK 
	- course_id: int, not NULL, FK
	- Relationship: 
		- Facilitates M:N relationship between Professors and Courses

- Departments: records details of Departments which Courses and Professors are categorized by.
	- department_id: int, auto_increment, not NULL, PK
	- department_name: varchar(145), not NULL
	- department_budget: decimal(10,2), not NULL
	- Relationship:
		- 1:M relationship exists between Departments and Professors, which is implemented with department_id as a FK inside of Professors.
		- 1:M relationship exists between Departments and Courses, which is implemented with department_id as a FK inside of Courses.

## Code Citations

1. db-connector.js
Citation fror the script:
Date: 11/14/2023
Copied from Node.JS Starter App guide, Step 1
No originality, just using the provided code to
connect to our SQL database.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

2. DML.sql
Citation for queries contained within DML.sql:
Date: 10/29/2023
Adapted from sample SQL queries on Project Step 3 Draft Version page
Used basic structure and modified with values for our database
Source URL: https://canvas.oregonstate.edu/courses/1933532/assignments/9297505

3. courseenrollment_forms.js
Citation for the functions contained within courseenrollment_forms.js:
Date: 11/18/2023
Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
Adapted code for enabling and disabling HTML elements in a JavaScript function
Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

4. delete_courseenrollment.js
Citation for the functions contained within delete_courseenrollment.js:
Date: 11/18/2023
Adapted from Node.JS Starter App guide, Step 7
Adapted code for using regular JavaScript (Part B) to send a delete request. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

5. update_courseenrollment.js
Citation for the "on submit" functions contained within update_courseenrollment.js:
Date: 11/20/2023
Adapted from Node.JS Starter App guide, Step 8
Copied code updating an entity and adapted the code to work with our variable, function, and route names.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

6. course_forms.js
Citation for the functions contained within course_forms.js:
Date: 11/18/2023
Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
Adapted code for enabling and disabling HTML elements in a JavaScript function
Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

7. delete_course.js
Citation for the functions contained within delete_course.js:
Date: 11/25/2023
Adapted from Node.JS Starter App guide, Step 7
Adapted code for using regular JavaScript (Part B) to send a delete request. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

8. update_course.js
Citation for the "on submit" functions contained within update_course.js:
Date: 11/14/2023
Adapted from Node.JS Starter App guide, Step 8
Copied code updating an entity and adapted the code to work with our variable, function, and route names.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

9. department_forms.js
Citation for the functions contained within department_forms.js:
Date: 11/14/2023
Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
Adapted code for enabling and disabling HTML elements in a JavaScript function
Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

10. delete_department.js
Citation for the functions contained within delete_department.js:
Date: 11/14/2023
Adapted from Node.JS Starter App guide, Step 7
Adapted code for using regular JavaScript (Part B) to send a delete request. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

11. update_department.js
Citation for the "on submit" functions contained within update_department.js:
Date: 11/14/2023
Adapted from Node.JS Starter App guide, Step 8
Copied code updating an entity and adapted the code to work with our variable, function, and route names.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

12. professorassignment_forms.js
Citation for the functions contained within professorassignment_forms.js:
Date: 11/25/2023
Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
Adapted code for enabling and disabling HTML elements in a JavaScript function
Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

13. delete_professorassignment.js
Citation for the functions contained within delete_professorassignment.js:
Date: 11/25/2023
Adapted from Node.JS Starter App guide, Step 7
Adapted code for using regular JavaScript (Part B) to send a delete request. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

14. update_professorassignment.js
Citation for the "on submit" functions contained within update_professorassignment.js:
Date: 11/25/2023
Adapted from Node.JS Starter App guide, Step 8
Copied code updating an entity and adapted the code to work with our variable, function, and route names.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

15. professor_forms.js
Citation for the functions contained within professor_forms.js:
Date: 11/17/2023
Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
Adapted code for enabling and disabling HTML elements in a JavaScript function
Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

16. delete_professor.js
Citation for the functions contained within delete_professor.js:
Date: 11/14/2023
Adapted from Node.JS Starter App guide, Step 7
Adapted code for using regular JavaScript (Part B) to send a delete request. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

17. update_professor.js
Citation for the "on submit" functions contained within update_professor.js:
Date: 11/27/2023
Adapted from a StackOverflow post.
Adapted code from a post that demonstrated how to create a number formatting object to stylize currency.
Source URL: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings

18. student_forms.js
Citation for the functions contained within student_forms.js:
Date: 11/17/2023
Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
Adapted code for enabling and disabling HTML elements in a JavaScript function
Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

19. delete_student.js
Citation for the functions contained within delete_student.js:
Date: 11/17/2023
Adapted from Node.JS Starter App guide, Step 7
Adapted code for using regular JavaScript (Part B) to send a delete request. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

20. update_student.js
Citation for the "on submit" functions contained within update_student.js:
Date: 11/14/2023
Adapted from Node.JS Starter App guide, Step 8
Copied code updating an entity and adapted the code to work with our variable, function, and route names.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

21. departments.js
Citation for the currency-formatting object: 
Date: 11/27/2023
Adapted from a StackOverflow post.
Adapted code from a post that demonstrated how to create a number formatting object to stylize currency.
Source URL: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings

22. professors.js
Citation for the currency-formatting object:
Date: 11/27/2023
Adapted from a StackOverflow post.
Adapted code from a post that demonstrated how to create a number formatting object to stylize currency.
Source URL: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings

23. app.js
Citation for the code within this script:
Date: 11/14/2023
Adapted from Node.JS Starter App guide, various steps
Copied "SETUP" lines from Node.JS Starter App and adapted and created routes based on structure shown in the guide.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

24. courseenrollments.hbs 
Citation for the handlebars code that displays data from the backend:
Date: 11/27/2023              
Adapted from Node.js starter guide, Step 4   
   Used information from the page and adapted code
   to display data dynamically in the page with
   with Handlebars.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

25. courses.hbs
Citation for the handlebars code that displays data from the backend:
Date: 11/27/2023
Adapted from Node.js starter guide, Step 4
   Used information from the page and adapted code
   to display data dynamically in the page with
   with Handlebars.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

26. departments.hbs
Citation for the handlebars code that displays data from the backend:
Date: 11/14/2023
Adapted from Node.js starter guide, Step 4
   Used information from the page and adapted code
   to display data dynamically in the page with
   with Handlebars.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

27. professorassignments.hbs
Citation for the handlebars code that displays data from the backend:
Date: 11/27/2023
Adapted from Node.js starter guide, Step 4
   Used information from the page and adapted code
   to display data dynamically in the page with
   with Handlebars.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

28. professors.hbs
Citation for the handlebars code that displays data from the backend:
Date: 11/27/2023
Adapted from Node.js starter guide, Step 4
   Used information from the page and adapted code
   to display data dynamically in the page with
   with Handlebars.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

29. students.hbs
Citation for the handlebars code that displays data from the backend:
Date: 11/17/2023
Adapted from Node.js starter guide, Step 4
   Used information from the page and adapted code
   to display data dynamically in the page with
   with Handlebars.
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
