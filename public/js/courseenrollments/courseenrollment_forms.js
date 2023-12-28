// Josh Jansen
// Josh Cantie

// Citation for the functions below:
// Date: 11/18/2023
// Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
// Adapted code for enabling and disabling HTML elements in a JavaScript function
// Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

// Enable and disable "Add Form" for Departments
function enableAddCourseEnrollmentForm() {
    document.getElementById('add-courseenrollment-div').style.display = "block";
}
function disableAddCourseEnrollmentForm() {
    document.getElementById('add-courseenrollment-div').style.display = "none";
}

// Enable and disable "Update Form" for Departments
function enableUpdateCourseEnrollmentForm() {
    document.getElementById('update-courseenrollment-div').style.display = "block";
}
function disableUpdateCourseEnrollmentForm() {
    document.getElementById('update-courseenrollment-div').style.display = "none";
}
