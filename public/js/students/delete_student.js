// Josh Jansen
// Josh Cantie

function confirmDelete(studentID) {
    if (confirm("Are you sure you want to delete Student ID " + studentID + "?") === true)
    {
        deleteStudent(studentID);
    }
}

// Citation for the following code:
// Date: 11/17/2023
// Adapted from Node.JS Starter App guide, Step 7
// Adapted code for using regular JavaScript (Part B) to send a delete request. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

function deleteStudent(studentID) {

    // Put our data we want to send in a javascript object
    let data = {
        id: studentID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/students", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(studentID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(studentID){

    let table = document.getElementById("students-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == studentID) {
            table.deleteRow(i);
            break;
       }
    }
}