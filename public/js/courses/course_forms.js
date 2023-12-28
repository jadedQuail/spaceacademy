// Josh Jansen
// Josh Cantie

// Citation for the functions below:
// Date: 11/18/2023
// Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
// Adapted code for enabling and disabling HTML elements in a JavaScript function
// Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

// Enable and disable "Add Form" for Departments
function enableAddCourseForm() {
    document.getElementById('add-course-div').style.display = "block";
}
function disableAddCourseForm() {
    document.getElementById('add-course-div').style.display = "none";
}

// Enable and disable "Update Form" for Courses
function enableUpdateCourseForm() {
    document.getElementById('update-course-div').style.display = "block";
}
function disableUpdateCourseForm() {
    document.getElementById('update-course-div').style.display = "none";
}
