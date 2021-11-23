const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email, 'Intern');
        this.school = school
        // getSchool() 
        // getRole() return intern
    }
    getSchool(){
        return this.school;
    }
}
console.log(new Intern().getRole())

module.exports = Intern;
