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

function startUpdateReq(departmentID) {

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/departments/populate', true);

    // Get data from query and use it to update DOM elements
    xhttp.onload = () => {
        const data = JSON.parse(xhttp.response);
        populateHTMLForm(departmentID, data);
    }
    xhttp.send();
}

function populateHTMLForm(departmentID, data) {

    // Grab proper elements
    let idTitle = document.getElementById("update_department_id_label");
    let departmentName = document.getElementById("update_department_name");
    let departmentBudget = document.getElementById("update_department_budget");

    // Find proper database entry based on ID, update elements
    for (let i = 0; i < data.length; i++)
    {
        if (departmentID === data[i]['Department ID'])
        {
            // Text and date values 
            idTitle.innerText = data[i]['Department ID'];
            departmentName.value = data[i]['Department Name'];
            departmentBudget.value = data[i]['Department Budget'];
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
let updateDepartmentForm = document.getElementById('update-department-form-ajax');

// Function for event listener to update item
updateDepartmentForm.addEventListener("submit", function (e) {
   
    // Prevent submission
    e.preventDefault();

    // Get data input
    let idValue = document.getElementById("update_department_id_label").innerText;
    let departmentNameValue = document.getElementById("update_department_name").value;
    let departmentBudgetValue = document.getElementById("update_department_budget").value;

    // Account for null budget value
    if (isNaN(departmentBudgetValue)) 
    {
        return;
    }

    // Create data object
    let data = {
        id: idValue,
        departmentName: departmentNameValue,
        departmentBudget: departmentBudgetValue,
    }

    // Set up request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/departments", true);

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
function updateRow(data, departmentID) {

    let parsedData = JSON.parse(data);
    let table = document.getElementById("departments-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       
       // Iterate
       if (table.rows[i].getAttribute("data-value") == departmentID) {
        
            // Index
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Department Name
            let departmentName = updateRowIndex.getElementsByTagName("td")[1];
            departmentName.innerHTML = parsedData[0].department_name;

            // Department Budget
            let departmentBudget = updateRowIndex.getElementsByTagName("td")[2];
            departmentBudget.innerHTML = currencyFormat.format(parsedData[0].department_budget);
       }
    }
    // Disable the form
    disableUpdateDeptForm();
}