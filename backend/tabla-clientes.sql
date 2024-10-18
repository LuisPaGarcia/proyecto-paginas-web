-- Crear una nueva tabla con el campo id_secreto
CREATE TABLE clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_secreto TEXT NOT NULL,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefono TEXT,
  direccion TEXT,
  ciudad TEXT,
  pais TEXT,
  tipo TEXT,
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);