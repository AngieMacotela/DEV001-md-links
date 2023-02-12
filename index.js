const { fileMd, pathRelative, pathAbsolute, validateLinks } = require('./api.js')
const path = 'C:\DEV001-md-links\prueba\Saga Harry Potter.md'

/*const mdLinks = (pathRuta, options) => {
  return new Promise ((resolve, reject) => {

  })
}*/

/*if (fileMd(path) === true) {
  if (pathRelative(path) === true) {
    console.log(path)
  } else {
    console.log(pathAbsolute(path))
  }
}*/

const mdLinks = (path, options) => {
 return new Promise ((resolve, reject) => {
    if (fileMd(path) === true) {
      if (pathRelative(path) === true) {
        console.log(path)
      } else {
        console.log(pathAbsolute(path))
      }
    }
 })
}

module.exports = {
  mdLinks,
};
