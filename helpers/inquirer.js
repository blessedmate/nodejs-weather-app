const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.green} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.green} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.green} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.green} Exit`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('======================='.green);
    console.log('   Choose an option    '.white);
    console.log('=======================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {

    console.log('\n');

    await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`,
        }
    ]);

}

const readInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please insert a value';
                }
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);
    return description;
}

// List available tasks to delete
const listTasksToDelete = async (tasks = []) => {

    const choices = tasks.map((t, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: t.id,
            name: `${idx} ${t.description}`,
        };
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);

    return id;
}


// List available tasks to complete
const listTasksToComplete = async (tasks = []) => {

    const choices = tasks.map((t, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: t.id,
            name: `${idx} ${t.description}`,
            checked: (t.completedIn) ? true : false
        };
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Choose',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);

    return ids;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    listTasksToComplete,
    confirm
}