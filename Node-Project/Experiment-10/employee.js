const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let employees = [];

function showMenu() {
  console.log("\n23BAD10007-MANNAT MEHTA");
  console.log("Choose an option:");
  console.log("1. Add Employee");
  console.log("2. List Employees");
  console.log("3. Remove Employee");
  console.log("4. Exit");

  rl.question("Enter your choice: ", function (choice) {
    switch (choice.trim()) {
      case "1":
        addEmployee();
        break;
      case "2":
        listEmployees();
        break;
      case "3":
        removeEmployee();
        break;
      case "4":
        console.log("\nExiting Employee Management System...");
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        showMenu();
    }
  });
}

function addEmployee() {
  rl.question("Enter Employee Name: ", function (name) {
    rl.question("Enter Employee ID: ", function (id) {
      employees.push({ id: id.trim(), name: name.trim() });
      console.log("Employee added successfully!");
      showMenu();
    });
  });
}

function listEmployees() {
  if (employees.length === 0) {
    console.log("No employees found.");
  } else {
    console.log("\nEmployee List:");
    employees.forEach((emp, index) => {
      console.log(`${index + 1}. Name: ${emp.name}, ID: ${emp.id}`);
    });
  }
  showMenu();
}

function removeEmployee() {
  rl.question("Enter Employee ID to remove: ", function (id) {
    const index = employees.findIndex((emp) => emp.id === id.trim());
    if (index !== -1) {
      employees.splice(index, 1);
      console.log(`Employee with ID ${id} removed successfully!`);
    } else {
      console.log(`Employee with ID ${id} not found.`);
    }
    showMenu();
  });
}

console.log("Welcome to Employee Management System");
console.log("-------------------------------------");
showMenu();
