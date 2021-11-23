class Employee {
    constructor(name, id, email, role,) {
        this.name = name
        this.id = id
        this.email = email
        this.role = role
        

        // getId()
        // getEmail()
        // getRole() returns 'Employee'

    }

    getRole() {
        if(this.role === undefined)
        return "Employee"
        else {
            return this.role
        }
    }
    getEmail() {
        return this.email
    }
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
}
    

    
module.exports = Employee;
