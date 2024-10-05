CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  costo REAL NOT NULL,
  precio REAL NOT NULL,
  categoria TEXT NOT NULL,
  talla TEXT,
  color TEXT,
  stock INTEGER NOT NULL,
  fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP
);