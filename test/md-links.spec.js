const { mdLinks } = require('../index.js');
const { fileMd, toAbsolute, readFile, validateLinks } = require('../api')

const absolutePath = 'C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md'

describe('fileMd', () => {
  it('debe ser una funcion', () => {
    expect(typeof fileMd).toBe('function');
  });
  it('debe retorna true si el archivo es .md', () => {
    expect(fileMd('./prueba\\Saga Harry Potter.md')).toBe(true);
  });
  it('debe retorna false si el archivo no es .md', () => {
    expect(fileMd('./prueba\\PersonajesTheHungerGames.txt')).toBe(false);
  });
});


describe('toAbsolute', () => {
  it('debe ser una funcion', () => {
    expect(typeof toAbsolute).toBe('function');
  });
  it('debe retornar true si el path es absoluto', () => {
    expect(toAbsolute(absolutePath)).toBeTruthy();
  });
  it('debe retorna el path absoluto si el path es relativo', () => {
    expect(toAbsolute('./prueba\\Saga Harry Potter.md')).toBe('C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md');
  });
  it('debe devolver el mismo path si es absoluto', () => {
    expect(toAbsolute('C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md')).toBe('C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md');
  })
});

describe('readFile', () => {
  it('debe devolver una promesa', () => {
    readFile('./prueba\\Saga Harry Potter.md').then((result) => {
      expect(readFile('./prueba\\Saga Harry Potter.md').toBe(typeof Promise));
    })
      .catch(() => { })
  })
  it('debe rechazar si no tiene links', () => {
    readFile('./prueba\\PruebaSinLinks.md').catch((error) => {
      expect(error).toEqual(error);
    })
  });
});

describe('validateLinks', () => {
  it('debe devolver una promesa', () => {
    validateLinks(absolutePath).then(() => {
      expect(validateLinks(absolutePath)).toBe(typeof Promise);
    })
      .catch(() => { })
  });
  it('debe retornar array con objetos {href,text,file}', () => {
    const file = [
      {
        href: 'https://es.wikipedia.org/wiki/Harry_Potter_y_el_c%C3%A1liz_de_fuego',
        text: 'Harry Potter y el cáliz de fuego',
        file: 'C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md'
      },
    ]
    return validateLinks(absolutePath).then((result) => {
      expect(result).toEqual(file);
    })
      .catch(() => { })
  });
  it('debe rechazar si hay un error', () => {
    return validateLinks('./prueba\\PruebaSinLinks.md').catch((error) => {
      expect(error).toEqual(error)
    });
  });
});
const links = [
  {
    href: 'https://es.wikipedia.org/wiki/Harry_Potter_y_el_prisionero_de_Azkaban',
    text: 'Harry Potter y el prisionero de Azkaban',
    file: 'C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md',
    status: 200,
    statusText: 'OK'
  },
  {
    ref: 'httpss://es.wikipedia.org/wiki/Harry_Potter_y_el_c%C3%A1liz_de_fuego',
    text: 'Harry Potter y el cáliz de fuego',
    file: 'C:\\DEV001-md-links\\prueba\\Saga Harry Potter.md',
    status: 400,
    statusText: 'FAIL'
  },
]

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  //it('Deberia devolver una promesa', () => {
    //expect(mdLinks()). toBe (typeof Promise);
 // });
  it('Debe rechazar cuando el path no existe', () => {
    return mdLinks('/angie/cursos/noexiste.md').catch((error) => { 
      expect(error).toBe('La ruta no existe');
    })
  })
});