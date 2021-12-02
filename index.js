const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const employees = []

const generateHTML = employees => {
    const employeeCards = employees.map((emp)=>generateCard(emp))
                return `   <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                <title>Team-Profile-Generator</title>
            </head>
            <body class=bg-dark>
                <h1 style="text-align:center; color:white;">Work Employees</h1>
                <div style="display:flex; justify-content: space-around;">
                ${employeeCards.join("\n")}
                </div>
                <script src="https://kit.fontawesome.com/5fce8efb76.js" crossorigin="anonymous"></script>
            </body>
            </html>`;
}
// function employeeLoop(emp) {
//     console.log(emp)
//     emp.map(generateCard(emp))

// }

const generateCard = (emp) => {
    if (emp.role === "Manager") {

        return `
    <div class="card text-white bg-primary mb-3"" style="width: 18rem;">
  <div>
    <h5 class="card-title">${emp.name}</h5>
    <h6 class="card-subtitle">${emp.role}<i class="fas fa-user-tie"></i></h6>
    <ul class="card-text"> <hr/>
    <li>ID: ${emp.id}</li>
    <li>Office Number: ${emp.officeNumber}</li>
    <li><a class="text-white" href = "mailto:${emp.email}?subject = Feedback&body = Message">
    <i class="fas fa-paper-plane"></i>Email
</a></li>
    </ul>
    
  </div>
</div>
    `
    }
    if (emp.role === "Engineer") {
        return `
    <div class="card text-white bg-success mb-3" style="width: 18rem;">
  <div>
    <h5 class="card-title">${emp.name}</h5>
    <h6 class="card-subtitle">${emp.role}<i class="fas fa-user-astronaut"></i></h6>
    <ul class="card-text"> <hr/>
    <li>ID: ${emp.id}</li>
    <li><a class="text-white" href = "https://github.com/${emp.github}"><i class="fab fa-github-square">GitHub</i></a></li>
    <li><a class="text-white" href = "mailto:${emp.email}?subject = Feedback&body = Message"><i class="fas fa-paper-plane"></i>Email</a></li>
    </ul>
    
  </div>
</div>
    `
    }
    if (emp.role === "Intern") {
       return `
    <div class="card text-dark bg-warning mb-3" style="width: 18rem;">
  <div>
    <h5 class="card-title">${emp.name}</h5>
    <h6 class="card-subtitle">${emp.role}<i class="fas fa-user-graduate"></i></h6>
    <ul class="card-text"> <hr/>
    <li>ID: ${emp.id}</li>
    <li>School: ${emp.school}</li>
    <li><a class="text-black" href = "mailto:${emp.email}?subject = Feedback&body = Message">
    <i class="fas fa-paper-plane"></i>Email
</a></li>
    </ul>
    
  </div>
</div>
    `
    }
}

const getRole = (data) => {
    console.log(data.role);
    if (data.role === 'Manager') {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'officeNumber',
                message: 'Please enter the managers office number.'
            }
        ])
            .then(employeeRoleQ => ({ ...data, ...employeeRoleQ }))
    }
    if (data.role === 'Engineer') {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'github',
                message: 'Please enter the engineers github user name.'
            }
        ])
            .then(employeeRoleQ => ({ ...data, ...employeeRoleQ }))
    }
    if (data.role === 'Intern') {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'school',
                message: 'Please enter the interns school they attend.'
            }
        ])
            .then(employeeRoleQ => ({ ...data, ...employeeRoleQ }))
    }
}

function anotherEmployee() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'addEmp',
            message: 'Would you like to add another employee?',
            choices: ['YES', 'NO']
        }
    ])
        .then(anotherE => {
            console.log(employees)
            if (anotherE.addEmp === 'YES') { initFunction() }
            else {
                console.log(employees)
                generateHTML(employees)
                fs.writeFileSync("./myteam.html", generateHTML(employees));
                console.info("Success!");
            }
        })
}

//Write your app here 
const initFunction = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please input the name of the employee.'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please input the ID number of the employee.'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the email of the employee.'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Please choose the employees role from the following selections.',
            choices: ['Manager', 'Engineer', 'Intern']
        },

        // {
        //     type: 'confirm',
        //     name: 'addEmp',
        //     message: 'would you like to add another employee?'
        // },

        // addEmployee(addEmp)
        // ,
    ])
        .then(getRole).catch(err => console.log(err))
        .then(addEmployee).catch(err => console.log(err))
        .then(anotherEmployee).catch(err => console.log(err))

}

function addEmployee(data) {
    console.log(data)
    if (data.role === 'Manager') {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber, data.role)
        employees.push(manager);
        console.log(employees);
    }
    if (data.role === 'Engineer') {
        const engineer = new Engineer(data.name, data.id, data.email, data.github, data.role)
        employees.push(engineer);
        console.log(employees)
    }
    if (data.role === 'Intern') {
        const intern = new Intern(data.name, data.id, data.email, data.school, data.role)
        employees.push(intern)
        console.log(employees)
    }
    else {
        return
    }
}

initFunction();