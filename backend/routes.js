const express = require("express");
const db = require("./db");
const router = express.Router();

// Ruta para obtener todos los elementos
router.get("/items", (req, res) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Ruta para crear un nuevo elemento
router.post("/items", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO items (name) VALUES (?)", [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Ruta para obtener todos los clientes
router.get("/obtener-clientes", (req, res) => {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    if (err) {
      lien;
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});
// Ruta para crear un nuevo cliente
router.post("/agregar-cliente", (req, res) => {
  const { nombre, apellido, email, telefono, direccion, ciudad, pais, tipo } =
    req.body;

  const sql = `
    INSERT INTO clientes (
      nombre, 
      apellido, 
      email, 
      telefono, 
      direccion, 
      ciudad, 
      pais,
      tipo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    nombre,
    apellido,
    email,
    telefono,
    direccion,
    ciudad,
    pais,
    tipo,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Ruta para obtener todos los productos
router.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Ruta para crear un nuevo producto
router.post("/productos", (req, res) => {
  const { nombre, descripcion, costo, precio, categoria, talla, color, stock } =
    req.body;

  const sql = `
    INSERT INTO productos (
      nombre, 
      descripcion, 
      costo, 
      precio, 
      categoria, 
      talla, 
      color, 
      stock
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    nombre,
    descripcion,
    costo,
    precio,
    categoria,
    talla,
    color,
    stock,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Ruta para actualizar un producto
router.put("/productos/:id", (req, res) => {
  const { nombre, descripcion, costo, precio, categoria, talla, color, stock } =
    req.body;
  const { id } = req.params;

  const sql = `
    UPDATE productos SET
      nombre = ?, 
      descripcion = ?, 
      costo = ?, 
      precio = ?, 
      categoria = ?, 
      talla = ?, 
      color = ?, 
      stock = ?
    WHERE id = ?
  `;

  const params = [
    nombre,
    descripcion,
    costo,
    precio,
    categoria,
    talla,
    color,
    stock,
    id,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// Ruta para eliminar un producto
router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM productos WHERE id = ?";

  db.run(sql, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// Ruta para obtener todos los pedidos
router.get("/pedidos", (req, res) => {
  const sql = "SELECT * FROM pedidos";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Ruta para crear un nuevo pedido
router.post("/pedidos", (req, res) => {
  const { cliente_id } = req.body;
  const sql = `
    INSERT INTO pedidos (cliente_id)
    VALUES (?)
  `;
  const params = [cliente_id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Ruta para agregar un producto a un pedido
router.post("/pedido_productos", (req, res) => {
  const { pedido_id, producto_id, cantidad, precio } = req.body;
  const sql = `
    INSERT INTO pedido_productos (pedido_id, producto_id, cantidad, precio)
    VALUES (?, ?, ?, ?)
  `;
  const params = [pedido_id, producto_id, cantidad, precio];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Ruta para obtener todos los pedidos con detalles
router.get('/ver-pedidos', (req, res) => {
  const sql = `
    SELECT p.id, p.cliente_id, c.nombre, c.apellido, COUNT(pp.producto_id) AS total_productos, SUM(pp.cantidad * pp.precio) AS total, SUM(pp.cantidad) AS total_cantidad
    FROM pedidos p
    JOIN clientes c ON p.cliente_id = c.id
    JOIN pedido_productos pp ON p.id = pp.pedido_id
    GROUP BY p.id, p.cliente_id, c.nombre, c.apellido
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

module.exports = router;

module.exports = router;
