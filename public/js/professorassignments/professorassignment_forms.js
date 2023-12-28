// Josh Jansen
// Josh Cantie

// Citation for the functions below:
// Date: 11/25/2023
// Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
// Adapted code for enabling and disabling HTML elements in a JavaScript function
// Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

// Enable and disable "Add Form" for Departments
function enableAddProfessorAssignmentForm() {
    document.getElementById('add-professorassignment-div').style.display = "block";
}
function disableAddProfessorAssignmentForm() {
    document.getElementById('add-professorassignment-div').style.display = "none";
}

// Enable and disable "Update Form" for Departments
function enableUpdateProfessorAssignmentForm() {
    document.getElementById('update-professorassignment-div').style.display = "block";
}
function disableUpdateProfessorAssignmentForm() {
    document.getElementById('update-professorassignment-div').style.display = "none";
}
