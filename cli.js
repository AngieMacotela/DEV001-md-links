const { mdLinks } = require('./index.js');

mdLinks('C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md', {validate:true}).then((exito) => {

    console.log(exito);

}).catch((error) => {
    console.log(error)

})