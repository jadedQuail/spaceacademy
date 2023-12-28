// Josh Jansen
// Josh Cantie

// ON PRESS EDIT //

function startUpdateReq(professorAssignmentID) {

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/professorassignments/populate', true);

    // Get data from query and use it to update DOM elements
    xhttp.onload = () => {
        const data = JSON.parse(xhttp.response);
        populateHTMLForm(professorAssignmentID, data);
    }
    xhttp.send();
}

function populateHTMLForm(professorAssignmentID, data) {
    
    // Grab proper elements
    let idTitle = document.getElementById("update_professorassignment_id_label");
    let professorSelect = document.getElementById("update_professorassignment_professor_select");
    let courseSelect = document.getElementById("update_professorassignment_course_select");

    // Find proper database entry based on ID, update elements
    for (let i = 0; i < data.length; i++)
    {
        if (professorAssignmentID === data[i]['Professor Assignment ID'])
        {
            console.log(data[i]);

            // Update input values
            idTitle.innerText = data[i]['Professor Assignment ID'];
            professorSelect.value = data[i]['Professor ID'];
            courseSelect.value = data[i]['Course ID'];
        }
    }
}

// ON PRESS SUBMIT //

// Citation for the following code:
// Date: 11/25/2023
// Adapted from Node.JS Starter App guide, Step 8
// Copied code updating an entity and adapted the code to work with our variable, function, and route names.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Object to modify
let updateProfessorAssignmentForm = document.getElementById('update-professorassignment-form-ajax');

// Function for event listener to update item
updateProfessorAssignmentForm.addEventListener("submit", function (e) {
   
    // Prevent submission
    e.preventDefault();

    // Get data input
    let idValue = document.getElementById("update_professorassignment_id_label").innerText;
    let professorIdValue = document.getElementById("update_professorassignment_professor_select").value;
    let courseIdValue = document.getElementById("update_professorassignment_course_select").value;

    // Create data object
    let data = {
        id: idValue,
        professorId: professorIdValue,
        courseId: courseIdValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", '/professorassignments', true);

    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle resolution of request
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Call other function for updating entry
            updateRow(xhttp.response, idValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
});

// Function for updating the row of data on the HTML page
function updateRow(data, professorAssignmentID){

    let parsedData = JSON.parse(data);
    let table = document.getElementById("professorassignments-table");
    for (let i = 0, row; row = table.rows[i]; i++) {

        // Iterate
        if (table.rows[i].getAttribute("data-value") == professorAssignmentID) {

            // Index
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Professor Name
            let professorSelection = updateRowIndex.getElementsByTagName("td")[1];
            professorSelection.innerHTML = parsedData[0]['Professor Name'];

            // Student Name
            let courseSelection = updateRowIndex.getElementsByTagName("td")[2];
            courseSelection.innerHTML = parsedData[0]['Course Name'];
       }
    }
    // Disable the form
    disableUpdateProfessorAssignmentForm();
}