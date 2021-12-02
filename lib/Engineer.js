const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email, 'Engineer');
        this.github = github;
        // getGithub()
        // getRole() return Engineer
    }
    getGithub(){
        return this.github;
    }
}
console.log(new Engineer().getRole())
module.exports = Engineer;
