#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { spawn } = require('child_process');

async function init() {
    console.log(chalk.blue.bold("\n Welcome to Starter Project Generator\n"));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            default: 'starter-project-setup'
        },
        {
            type: 'list',
            name: 'database',
            message: 'Select Database Stack:',
            choices: ['PostgreSQL (Sequelize)', 'MongoDB (Mongoose)']
        }
    ]);

    const projectPath = path.join(process.cwd(), answers.projectName);

    try {
        if (fs.existsSync(projectPath)) {
            console.log(chalk.red(`\n Error: Folder ${answers.projectName} already exists.`));
            return;
        }

        console.log(chalk.yellow("🏗️  Scaffolding project..."));

        // Copy Common Templates
        const templatePath = path.join(__dirname, '../templates');
        fs.copySync(path.join(templatePath, 'common'), projectPath);

        // Copy Database-Specific Templates
        const dbFolder = answers.database.includes('PostgreSQL') ? 'postgres' : 'mongo';
        fs.copySync(path.join(templatePath, dbFolder), projectPath);

        // Generate dynamic package.json
        const packageJson = {
            name: answers.projectName,
            version: "1.0.0",
            main: "src/app.js",
            scripts: {
                "start": "node src/app.js",
                "dev": "nodemon src/app.js"
            },
            dependencies: {
                "express": "^4.19.2",
                "dotenv": "^16.4.5",
                "jsonwebtoken": "^9.0.2",
                "bcrypt": "^6.0.0",
                "cors": "^2.8.5",
                ...(dbFolder === 'postgres'
                    ? { "sequelize": "^6.37.3", "pg": "^8.11.5", "pg-hstore": "^2.3.4" }
                    : { "mongoose": "^8.0.0" })
            },
            devDependencies: { "nodemon": "^3.1.0" }
        };
        fs.writeJsonSync(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });

        // Install Dependencies
        await installDependencies(projectPath);

        console.log(chalk.green.bold(`\n✅ Success! Project ${answers.projectName} is ready.`));
        console.log(chalk.white(`\nNext steps:\n  1. cd ${answers.projectName}\n  2. Configure your .env\n  3. Run ${chalk.cyan('npm run dev')}\n`));

    } catch (err) {
        console.error(chalk.red('\n Critical Error:'), err);
    }
}

function installDependencies(projectPath) {
    return new Promise((resolve, reject) => {
        console.log(chalk.cyan("Running npm install..."));
        const child = spawn('npm', ['install'], { cwd: projectPath, stdio: 'inherit', shell: true });
        child.on('close', (code) => code === 0 ? resolve() : reject());
    });
}

init();