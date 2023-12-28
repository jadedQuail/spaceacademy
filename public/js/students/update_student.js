// Josh Jansen
// Josh Cantie

// ON PRESS EDIT //

function startUpdateReq(studentID) {

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/students/populate', true);

    // Get data from query and use it to update DOM elements
    xhttp.onload = () => {
        const data = JSON.parse(xhttp.response);
        populateHTMLForm(studentID, data);
    }
    xhttp.send();
}

function populateHTMLForm(studentID, data) {

    // Grab proper elements
    let idTitle = document.getElementById("update_student_id_label");
    let firstName = document.getElementById("update_student_first_name");
    let lastName = document.getElementById("update_student_last_name");
    let birthdate = document.getElementById("update_student_birthdate");
    let homePlanet = document.getElementById("update_student_home_planet");

    // Find proper database entry based on ID, update elements
    for (let i = 0; i < data.length; i++)
    {
        if (studentID === data[i]['Student ID'])
        {
            // Text and date values 
            idTitle.innerText = data[i]['Student ID'];
            firstName.value = data[i]['First Name'];
            lastName.value = data[i]['Last Name'];
            birthdate.value = data[i]['Birthdate'];
            homePlanet.value = data[i]['Home Planet'];
            
            // Radio buttons

            // Is Undergraduate
            if (data[i]['Is Undergraduate'] === 'Yes') {
                document.getElementById("update_student_is_undergraduate-yes").checked = true;
            }
            else {
                document.getElementById("update_student_is_undergraduate-no").checked = true;
            }

            // Receives Financial Aid
            if (data[i]['Receives Financial Aid'] === 'Yes') {
                document.getElementById("update_student_receives_financial_aid-yes").checked = true;
            }
            else {
                document.getElementById("update_student_receives_financial_aid-no").checked = true;
            }
        }
    }
}

// ON PRESS SUBMIT //

// Citation for the following code:
// Date: 11/14/2023
// Adapted from Node.JS Starter App guide, Step 8
// Copied code updating an entity and adapted the code to work with our variable, function, and route names.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Object to modify
let updateStudentForm = document.getElementById('update-student-form-ajax');

// Function for event listener to update item
updateStudentForm.addEventListener("submit", function (e) {
   
    // Prevent submission
    e.preventDefault();

    // Get data input
    let idValue = document.getElementById("update_student_id_label").innerText;
    let firstNameValue = document.getElementById("update_student_first_name").value;
    let lastNameValue = document.getElementById("update_student_last_name").value;
    let birthdateValue = document.getElementById("update_student_birthdate").value;
    let homePlanetValue = document.getElementById("update_student_home_planet").value;
    let isUndergraduateValue = document.getElementById("update_student_is_undergraduate-yes").checked ? 1 : 0;
    let receivesFinancialAidValue = document.getElementById("update_student_receives_financial_aid-yes").checked ? 1 : 0;

    // Create data object
    let data = {
        id: idValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        birthdate: birthdateValue,
        homePlanet: homePlanetValue,
        isUndergraduate: isUndergraduateValue,
        receivesFinancialAid: receivesFinancialAidValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", '/students', true);

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
function updateRow(data, studentId) {

    let parsedData = JSON.parse(data);
    let table = document.getElementById("students-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       
       // Iterate
       if (table.rows[i].getAttribute("data-value") == studentId) {
        
            // Index
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // First Name
            let firstName = updateRowIndex.getElementsByTagName("td")[1];
            firstName.innerHTML = parsedData[0].first_name;

            // Last Name
            let lastName = updateRowIndex.getElementsByTagName("td")[2];
            lastName.innerHTML = parsedData[0].last_name;

            // Birthdate
            let birthdate = updateRowIndex.getElementsByTagName("td")[3];
            birthdate.innerHTML = parsedData[0].birthdate;

            // Home Planet
            let homePlanet = updateRowIndex.getElementsByTagName("td")[4];
            homePlanet.innerHTML = parsedData[0].home_planet;

            // Is Undergraduate
            let isUndergraduate = updateRowIndex.getElementsByTagName("td")[5];
            isUndergraduate.innerHTML = parsedData[0].is_undergraduate === 1 ? "Yes" : "No";

            // Receives Financial Aid
            let receivesFinancialAid = updateRowIndex.getElementsByTagName("td")[6];
            receivesFinancialAid.innerHTML = parsedData[0].receives_financial_aid === 1 ? "Yes" : "No";
       }
    }
    // Disable the form
    disableUpdateStudentForm();
}