// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Initialize the employees data array
const employeesData = [];

// Collect employee data
const collectEmployees = function() {
  // Prompt the user for the employee's first name
  let addNextEmployee = true;

  while (addNextEmployee) {
    let firstName = window.prompt("Enter the employee's first name:");
    if (firstName === null || firstName.trim() === "") {
      firstName = window.prompt("First Name cannot be blank. Please enter the employee's first name again or cancel to abort:");
      if (firstName === null || firstName.trim() === "") {
        window.alert("First Name cannot be blank - Aborting employee entry");
        return employeesData; // Return the current data
      }
    }

    let lastName = window.prompt("Enter the employee's last name:");
    if (lastName === null || lastName.trim() === "") {
      lastName = window.prompt("Last Name cannot be blank. Please enter the employee's last name again or cancel to abort:");
      if (lastName === null || lastName.trim() === "") {
        window.alert("Last Name cannot be blank - Aborting employee entry");
        return employeesData; // Return the current data
      }
    }

    let salary = window.prompt("Enter the employee's salary:");
    if (salary === null || isNaN(Number(salary))) {
      salary = window.prompt("Salary must be a number or zero. Please enter the employee's salary again or cancel to abort:");
      if (salary === null || isNaN(Number(salary))) {
        window.alert("Salary must be a number - Aborting employee entry");
        return employeesData; // Return the current data
      }
    } else {
      salary = Number(salary);
    }

    // Create a new employee object and add it to the employees array
    const newEmployee = { firstName, lastName, salary };
    employeesData.push(newEmployee);

    addNextEmployee = window.confirm("Would you like to add another employee?");
  }
  return employeesData;
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  if (employeesArray.length > 1) {
    const randomEmployee = employeesArray[Math.floor(Math.random() * employeesArray.length)];
    console.log(`Congrats to ${randomEmployee.firstName} ${randomEmployee.lastName}, the winner of our random draw!`);
  } else {
    console.log("Not enough employees to select a random employee.");
  }
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  if (employeesArray.length > 0) {
    let totalSalary = 0;
    for (let i = 0; i < employeesArray.length; i++) {
      totalSalary += employeesArray[i].salary;
    }
    const averageSalary = totalSalary / employeesArray.length;
    console.log(`The average salary of all employees is: ${averageSalary.toLocaleString("en-US", { style: "currency", currency: "AUD" })}`);
  }
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"AUD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

//Obtain employee data from the user and display it in an HTML table

const trackEmployeeData = function() {
  console.log('Button Clicked')
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
