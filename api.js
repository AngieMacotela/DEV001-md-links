const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

//Verificar si es un archivo MD
const fileMd = (pathRuta) => {
    const fileMd = path.extname(pathRuta);
    return fileMd === ".md";
};

//Creamos una función la cual permite devolver rutas absolutas mediante el método path.isAbsolute que 
//devuelve true si la ruta es una ruta absoluta y false si es una ruta relativa.
const pathRelative = (pathRuta) => {
    //Devolvemos el resultado de path.isAbsolute(pathRuta), indicando si la ruta es absoluta o relativa.
    return path.isAbsolute(pathRuta);
};

//Convertirmos rutas relativas en absolutas usando la función path.resolve de la librería path de Node.js para devolver una ruta absoluta.
const pathAbsolute = (pathRuta) => {
    return path.resolve(pathRuta);
};

//Extraer los enlaces
const readFile = (pathRuta) => {
    return new Promise((resolve, reject) => {
        //Se lee el contenido del archivo en la ruta especificada usando la función fs
        fs.readFile(pathRuta, "utf-8", (error, contenido) => {
            // Si existe un error, se llama a reject con el error, lo que significa que la promesa se rechazará y no se resolverá.
            if (error) {
                reject(error);
            } else {
                //Si no hay errores, la función verifica si el archivo es un archivo Markdown usando la función fileMd
                if (fileMd(pathRuta)) {
                    let links = [];
                    //Buscamos enlaces en el formato markdown usando expresiones regular 
                    const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
                    //Devolvemos el primer match encontrado o null si no se encuentra ningún match.
                    let match = regex.exec(contenido);
                    //Iteramos a través de todos los matches siempre y cuando match no sea null
                    while (match !== null) {
                        //Agreamos objetos a la matriz links con las propiedades href, text y file. 
                        links.push({
                            href: match[2],
                            text: match[1],
                            file: pathRuta,
                        });
                        match = regex.exec(contenido);
                    }
                    //Devolvemos la promesa con la matriz de enlaces extraídos.
                    resolve(links);
                }
            }
        })
    })
}

const validateLinks = async (pathRuta) => {
    //Crear un nuevo array y añadir los nuevos status y messager
    const promiseFetch = [];
    //Creamos una constante que leera y almacenara los enlaces de los archivos usando nuestra funcion readFile
    const link = readFile(pathRuta);
    //Utiliza await para esperar a que la promesa sea resuelta y recuperar los datos del archivo.
    const links = await link;
    //Recorremos el array
    links.map(element => {
        //Hacer petición fecth con la propiedad element.href por cada elemento del array
        promiseFetch.push(fetch(element.href)
            .then(function (rest) {
                //Agrega un objeto a promiseFetch con la información de cada enlace, incluido el URL, 
                //el texto del enlace, el nombre del archivo, el código de estado y el mensaje de estado de la respuesta de la petición fetch
                return {
                    href: element.href,
                    text: element.text,
                    file: element.file,
                    status: rest.status,
                    statusText: rest.statusText,
                };
            })
            .catch(function () {
                //Si la petición fetch falla, se agrega un objeto con el estado 404 y el mensaje "FAIL".
                return {
                    href: element.href,
                    text: element.text,
                    file: element.file,
                    status: 404,
                    statusText: 'FAIL',
                };
            })
        );
    });
    //Devuelve una promesa que resuelve todas las promesas en el array promiseFetch.
    return await Promise.all(promiseFetch);
}

readFile('C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md').then((links) => {
    console.log(links)
}).catch(() => {})

validateLinks('C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md').then(res=>console.log('promesa',res));

module.exports = {
    fileMd,
    pathRelative,
    pathAbsolute,
    validateLinks
};