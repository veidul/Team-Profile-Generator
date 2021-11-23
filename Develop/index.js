const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');


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
        .then(employeeRoleQ => ({...data,...employeeRoleQ}) )
    }
    if (data.role === 'Engineer') {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'github',
                message: 'Please enter the engineers github user name.'
            }
        ])
        .then(employeeRoleQ => ({ ...data, ...employeeRoleQ}) )
    }
    if (data.role === 'Intern') {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'school',
                message: 'Please enter the interns school they attend.'
            }
        ])
        .then(employeeRoleQ => ({ ...data, ...employeeRoleQ}) )
    }
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
        .then(getRole).catch(err=>console.log(err))
        .then(addEmployee).catch(err=>console.log(err))
}
const employees = []
function addEmployee(data) {
    console.log(data)
    if (data.role === 'Manager'){
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
        const intern = new intern(data.name, data.id, data.email, data.school, data.role)
        employees.push(intern)
        console.log(employees)
    }
    else {
        return
    }
}
initFunction();