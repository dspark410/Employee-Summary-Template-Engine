const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");
const team = []


const managerQuestions = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name (manager)?",
                name: "name"
            },
            {
                type: "input",
                message: "Enter your id number?",
                name: "id"
            },
            {
                type: "input",
                message: "Enter your email?",
                name: "email"
            },
            {
                type: "input",
                message: "Enter your office number?",
                name: "officenumber"
            }

        ]).then(response => {

            const manager = new Manager(
                response.name,
                response.id,
                response.email,
                response.officenumber
            )

            team.push(manager)
            addteamMember()

        }).catch(err => {
            throw err
        })
}

const addteamMember = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which role would you like to add to your team?",
                name: "chooseteam",
                choices: [
                    "Engineer",
                    "Intern",
                    "I do not wish to add any more team members"
                ]
            }

        ]).then(response => {
           
            switch(response.chooseteam) {
                case "Engineer":
                    createEngineer()
                    break
                case "Intern":
                    createIntern()
                    break
                default:
                    fs.writeFileSync(outputPath, render(team), "utf8")
                    break
            }

        }).catch(err => {
            throw err
        })
}

const createEngineer = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "name"
            },
            {
                type: "input",
                message: "Enter their id number?",
                name: "id"
            },
            {
                type: "input",
                message: "Enter their email?",
                name: "email"
            },
            {
                type: "input",
                message: "Enter their GitHub userid?",
                name: "github"
            }

        ]).then(response => {

            const engineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.github
            )

            team.push(engineer)
            addteamMember()

        }).catch(err => {
            throw err
        })
}

const createIntern = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the intern's name?",
                name: "name"
            },
            {
                type: "input",
                message: "Enter their id number?",
                name: "id"
            },
            {
                type: "input",
                message: "Enter their email?",
                name: "email"
            },
            {
                type: "input",
                message: "What school do they attend?",
                name: "school"
            }

        ]).then(response => {

            const intern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school
            )

            team.push(intern)
            addteamMember()

        }).catch(err => {
            throw err
        })
}

managerQuestions()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
