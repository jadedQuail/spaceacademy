// Josh Jansen
// Josh Cantie

// Citation for the functions below:
// Date: 11/17/2023
// Adapted from JavaScript in HTML pages from "Exploration - Web Application Technology" from Module 6
// Adapted code for enabling and disabling HTML elements in a JavaScript function
// Source URL: https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology

// Enable and disable "Add Form" for Professors
function enableAddProfessorForm() {
    document.getElementById('add-professor-div').style.display = "block";
}
function disableAddProfessorForm() {
    document.getElementById('add-professor-div').style.display = "none";
}

// Enable and disable "Update Form" for Professors
function enableUpdateProfessorForm() {
    document.getElementById('update-professor-div').style.display = "block";
}
function disableUpdateProfessorForm() {
    document.getElementById('update-professor-div').style.display = "none";
}
