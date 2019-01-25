const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    //convierte el arreglo listadoPorHacer en un formato JSON
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar', err);
        }
    });
}
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
    /*let lista;
    fs.readFile('db/data.json',(err,data)=>{
        if(err) throw err;
        lista = data;
    })
    return lista;*/
}
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion: descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //en el index se almacena la posicion del objeto buscado
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}
const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        let tarea = listadoPorHacer[index];
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return tarea;
    } else {
        return false;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}