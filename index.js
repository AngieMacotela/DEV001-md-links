const { fileMd, toAbsolute, readFile, validateLinks } = require('./api.js')
const pathRuta =  'C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md'

const mdLinks = (pathRuta, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = toAbsolute(pathRuta);
    console.log(absolutePath)
    if (!fileMd(absolutePath)) {
      reject('el archivo no es .md') // rechaza si no es un archivo .md
    } else {
      // funcion para leer archivos y obtener links en el archivo
      readFile(absolutePath).then((links) => {
        console.log(links)
        if (links.length === 0) {
          reject('no contiene links');
        } else {
          if (options.validate === false) {
            resolve(readFile(absolutePath));
          } else if (options.validate === true) {
            resolve(validateLinks(absolutePath));
          } else {
            reject('error')
          }
        };
      })
    };
  })
}

module.exports = {
mdLinks
};