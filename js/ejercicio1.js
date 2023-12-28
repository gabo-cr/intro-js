const user = {
    firstName: 'Samwise',
    lastName: 'Gamgee',
    bootcampThemes: [
        {
            name: 'Node.js',
            dateStart: '2024-02-12',
        },
        {
            name: 'Git',
            dateStart: '2023-11-28',
        },
        {
            name: 'React',
            dateStart: '2024-04-15',
        },
    ],
    searchingForJobs: true,
};

const reactTheme = user.bootcampThemes.find(theme => theme.name.trim().toLowerCase() === 'react');
console.log(`La fecha de inicio del módulo de ${reactTheme.name} del usuario ${user.firstName} ${user.lastName} es ${reactTheme.dateStart}.`);
