import * as fs from 'fs';

const path = 'C:\\home\\itm\\asw\\indicator-systems-web\\src\\components\\home\\';
const a = 'role';
let data;

function cap(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function showError(error) {
    if (error)
        console.error('Error al crear la carpeta:', error);
}

function mkdir(path) {
    fs.mkdir(path, showError);
}

function writeFile(path, data) {
    fs.writeFile(path, data, showError);
}

function readFile(sorce, target, name) {
    fs.readFile(sorce, 'utf8', (error, data) => {
        if (error) {
            showError(error)
            return
        }

        writeFile(
            target,
            data
                .replaceAll(a, name)
                .replaceAll(cap(a), cap(name))
        )
    });
}

try {
    const contenidoJSON = fs.readFileSync('./data.json', 'utf8');
    data = JSON.parse(contenidoJSON);
} catch (error) {
    console.error('Error al leer o analizar el archivo JSON:', error);
}

data.forEach(({name, attributes}) => {

    // carpet
    mkdir(`${path}${name}`);
    mkdir(`${path}${name}\\${name}New`);
    mkdir(`${path}${name}\\${name}Edit`);
    mkdir(`${path}${name}\\${name}List`);
    mkdir(`${path}${name}\\${name}New\\_redux`);
    mkdir(`${path}${name}\\${name}Edit\\_redux`);
    mkdir(`${path}${name}\\${name}List\\_redux`);

    // route file
    readFile(
        `${path}${a}\\${cap(a)}Routes.tsx`,
        `${path}${name}\\${cap(name)}Routes.tsx`,
        name
    );

    // new file
    readFile(
        `${path}${a}\\${a}New\\_redux\\${a}NewSlice.tsx`,
        `${path}${name}\\${name}New\\_redux\\${name}NewSlice.tsx`,
        name
    );
    readFile(
        `${path}${a}\\${a}New\\_redux\\${a}NewSaga.tsx`,
        `${path}${name}\\${name}New\\_redux\\${name}NewSaga.tsx`,
        name
    );
    readFile(
        `${path}${a}\\${a}New\\${cap(a)}New.tsx`,
        `${path}${name}\\${name}New\\${cap(name)}New.tsx`,
        name
    );

    // edit file
    readFile(
        `${path}${a}\\${a}Edit\\_redux\\${a}EditSlice.tsx`,
        `${path}${name}\\${name}Edit\\_redux\\${name}EditSlice.tsx`,
        name
    );
    readFile(
        `${path}${a}\\${a}Edit\\_redux\\${a}EditSaga.tsx`,
        `${path}${name}\\${name}Edit\\_redux\\${name}EditSaga.tsx`,
        name
    );
    readFile(
        `${path}${a}\\${a}Edit\\${cap(a)}Edit.tsx`,
        `${path}${name}\\${name}Edit\\${cap(name)}Edit.tsx`,
        name
    );

    // list file
    readFile(
        `${path}${a}\\${a}List\\_redux\\${a}ListSlice.tsx`,
        `${path}${name}\\${name}List\\_redux\\${name}ListSlice.tsx`,
        name
    );
    readFile(
        `${path}${a}\\${a}List\\_redux\\${a}ListSaga.tsx`,
        `${path}${name}\\${name}List\\_redux\\${name}ListSaga.tsx`,
        name
    );
    readFile(
        `${path}${a}\\${a}List\\${cap(a)}ListMenu.tsx`,
        `${path}${name}\\${name}List\\${cap(name)}ListMenu.tsx`,
        name
    );
    readFile(
        `${path}${a}\\${a}List\\${cap(a)}List.tsx`,
        `${path}${name}\\${name}List\\${cap(name)}List.tsx`,
        name
    );

});
