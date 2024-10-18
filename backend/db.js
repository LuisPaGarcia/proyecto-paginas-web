const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./proyecto-desarrollo-web.sqlite', (err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

module.exports = db;
