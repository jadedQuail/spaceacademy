// Josh Jansen
// Josh Cantie

// Citation for the following code:
// Date: 11/27/2023
// Adapted from a StackOverflow post.
// Adapted code from a post that demonstrated how to create a number formatting object to stylize currency.
// Source URL: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings

// Formatting for currency text
const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

// ON PRESS EDIT //

function startUpdateReq(professorID) {

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/professors/populate', true);

    // Get data from query and use it to update DOM elements
    xhttp.onload = () => {
        const data = JSON.parse(xhttp.response);
        populateHTMLForm(professorID, data);
    }
    xhttp.send();
}

function populateHTMLForm(professorID, data) {

    console.log(data);

    // Grab proper elements
    let idTitle = document.getElementById("update_professor_id_label");
    let departmentSelect = document.getElementById("update_professor_department_select");
    let firstName = document.getElementById("update_professor_first_name");
    let lastName = document.getElementById("update_professor_last_name");
    let birthdate = document.getElementById("update_professor_birthdate");
    let salary = document.getElementById("update_professor_salary");

    // Find proper database entry based on ID, update elements
    for (let i = 0; i < data.length; i++)
    {
        if (professorID === data[i]['Professor ID'])
        {
            // Text and date values 
            idTitle.innerText = data[i]['Professor ID'];
            departmentSelect.value = data[i]['Department ID'];
            firstName.value = data[i]['First Name'];
            lastName.value = data[i]['Last Name'];
            birthdate.value = data[i]['Birthdate'];
            salary.value = data[i]['Salary'];
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
let updateProfessorForm = document.getElementById('update-professor-form-ajax');

// Function for event listener to update item
updateProfessorForm.addEventListener("submit", function (e) {
   
    // Prevent submission
    e.preventDefault();

    // Get data input
    let idValue = document.getElementById("update_professor_id_label").innerText;
    let departmentIdValue = document.getElementById("update_professor_department_select").value;
    let firstNameValue = document.getElementById("update_professor_first_name").value;
    let lastNameValue = document.getElementById("update_professor_last_name").value;
    let birthdateValue = document.getElementById("update_professor_birthdate").value;
    let salaryValue = document.getElementById("update_professor_salary").value;

    // Create data object
    let data = {
        id: idValue,
        departmenId: departmentIdValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        birthdate: birthdateValue,
        salary: salaryValue,
    }

    // Set up request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/professors", true);

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
function updateRow(data, professorId) {

    let parsedData = JSON.parse(data);
    let table = document.getElementById("professors-table");
    for (let i = 0, row; row = table.rows[i]; i++) {

       // Iterate
       if (table.rows[i].getAttribute("data-value") == professorId) {
        
            // Index
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Department Name
            let departmentName = updateRowIndex.getElementsByTagName("td")[1];
            departmentName.innerHTML = parsedData[0]['Department Name'];

            // First Name
            let firstName = updateRowIndex.getElementsByTagName("td")[2];
            firstName.innerHTML = parsedData[0].first_name;

            // Last Name
            let lastName = updateRowIndex.getElementsByTagName("td")[3];
            lastName.innerHTML = parsedData[0].last_name;

            // Birthdate
            let birthdate = updateRowIndex.getElementsByTagName("td")[4];
            birthdate.innerHTML = parsedData[0].birthdate;

            // Salary
            let salary = updateRowIndex.getElementsByTagName("td")[5];
            salary.innerHTML = currencyFormat.format(parsedData[0].salary);
       }
    }
    // Disable the form
    disableUpdateProfessorForm();
}