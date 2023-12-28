// Josh Jansen
// Josh Cantie

// ON PRESS EDIT //

function startUpdateReq(courseID) {

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/courses/populate', true);

    // Get data from query and use it to update DOM elements
    xhttp.onload = () => {
        const data = JSON.parse(xhttp.response);
        populateHTMLForm(courseID, data);
    }
    xhttp.send();
}

function populateHTMLForm(courseID, data) {

    // Grab proper elements
    let idTitle = document.getElementById("update_course_id_label");
    let departmentSelect = document.getElementById("update_course_department_select");
    let courseName = document.getElementById("update_course_course_name");
    let creditHours = document.getElementById("update_course_credit_hours");
    let courseDescription = document.getElementById("update_course_course_description");

    // Find proper database entry based on ID, update elements
    for (let i = 0; i < data.length; i++)
    {
        if (courseID === data[i]['Course ID'])
        {
            // Text and date values 
            
            // Department
            if (data[i]['Department ID'] === null) {
                departmentSelect.value = 0;
            }
            else {
                departmentSelect.value = data[i]['Department ID'];
            }

            // Other
            idTitle.innerText = data[i]['Course ID'];
            courseName.value = data[i]['Course Name'];
            creditHours.value = data[i]['Credit Hours'];
            courseDescription.value = data[i]['Course Description'];
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
let updateCourseForm = document.getElementById('update-course-form-ajax');

// Function for event listener to update item
updateCourseForm.addEventListener("submit", function (e) {
   
    // Prevent submission
    e.preventDefault();

    // Get data input
    let idValue = document.getElementById("update_course_id_label").innerText;
    let departmentIdValue = document.getElementById("update_course_department_select").value;
    let courseNameValue = document.getElementById("update_course_course_name").value;
    let creditHoursValue = document.getElementById("update_course_credit_hours").value;
    let courseDescriptionValue = document.getElementById("update_course_course_description").value;

    // Create data object
    let data = {
        id: idValue,
        departmentId: departmentIdValue,
        courseName: courseNameValue,
        creditHours: creditHoursValue,
        courseDescription: courseDescriptionValue,
    }

    // Set up request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/courses", true);

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
function updateRow(data, courseId) {

    let parsedData = JSON.parse(data);

    console.log("Parsed Data: ");
    console.log(parsedData);

    let table = document.getElementById("courses-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       // Iterate
       if (table.rows[i].getAttribute("data-value") == courseId) {
        
            // Index
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Department Name
            let departmentName = updateRowIndex.getElementsByTagName("td")[1];
            if (parsedData[0]['Department Name'] === null) {
                departmentName.innerHTML = "NULL"
            }
            else {
                departmentName.innerHTML = parsedData[0]['Department Name'];
            }
            
            // Course Name
            let courseName = updateRowIndex.getElementsByTagName("td")[2];
            courseName.innerHTML = parsedData[0].course_name;

            // Credit Hours
            let creditHours = updateRowIndex.getElementsByTagName("td")[3];
            creditHours.innerHTML = parsedData[0].credit_hours;

            // Course Description
            let courseDescription = updateRowIndex.getElementsByTagName("td")[4];
            courseDescription.innerHTML = parsedData[0].course_description;
       }
    }
    
    // Disable the form
    disableUpdateCourseForm();
}