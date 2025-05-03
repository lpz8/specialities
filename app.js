const express = require('express');
const app = express();
const port = 3000;

const usersData = [
    { id: 1, name: 'Alice', age: 28, specialty: 'marketing' },
    { id: 2, name: 'Bob', age: 35, specialty: 'developers' },
    
];

function filterUsersBySpecialty(specialty) {
    return usersData.filter(user => user.specialty === specialty);
}

app.get('/', (req, res) => {
    const specialties = ['marketing', 'developers', 'QAs', 'ventas'];
    const nav = `
        <nav>
            <ul>
                <li><a href="/">Inicio</a></li>
                ${specialties.map(spec => `<li><a href="/\({spec}">\){spec.charAt(0).toUpperCase() + spec.slice(1)}</a></li>`).join('')}
            </ul>
        </nav>
    `;
    res.send(`
        <h1>Lista de Especialidades</h1>
        <p>Bienvenido a la página principal. Selecciona una especialidad:</p>
        ${nav}
    `);
});

app.get('/marketing', (req, res) => {
    const users = filterUsersBySpecialty('marketing');
    const userList = users.map(user => `<li>ID: ${user.id} - Nombre: ${user.name}, Edad: ${user.age}</li>`).join('');
    const nav = `
        <nav>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/marketing">Marketing</a></li>
                <li><a href="/developers">Developers</a></li>
                <li><a href="/QAs">QAs</a></li>
                <li><a href="/ventas">Ventas</a></li>
            </ul>
        </nav>
    `;
    res.send(`
        <h1>Especialidad: Marketing</h1>
        <p>Número de personas: ${users.length}</p>
        <ul>${userList}</ul>
        ${nav}
    `);
});



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});