const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email, 'Manager');
        this.officeNumber = officeNumber;

        // getOfficeNumber()
        // getRole() return manager
    }
getOfficeNumber(){
    return this.officeNumber;
}
}
console.log(new Manager().getRole())
module.exports = Manager;
