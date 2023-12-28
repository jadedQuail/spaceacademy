// Josh Jansen
// Josh Cantie

// Citation for the functions below:
// Date: 11/17/2023
// Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
// Adapted code for enabling and disabling HTML elements in a JavaScript function
// Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

// Enable and disable "Add Form" for Students
function enableAddStudentForm() {
    document.getElementById('add-student-div').style.display = "block";
}
function disableAddStudentForm() {
    document.getElementById('add-student-div').style.display = "none";
}

// Enable and disable "Update Form" for Students
function enableUpdateStudentForm() {
    document.getElementById('update-student-div').style.display = "block";
}
function disableUpdateStudentForm() {
    document.getElementById('update-student-div').style.display = "none";
}
