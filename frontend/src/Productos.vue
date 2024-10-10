<template>
  <Navbar />
  <div class="container">
    <h1>Productos</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Costo</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Talla</th>
          <th>Color</th>
          <th>Stock</th>
          <th>Fecha Agregado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.costo }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.categoria }}</td>
          <td>{{ producto.talla }}</td>
          <td>{{ producto.color }}</td>
          <td>{{ producto.stock }}</td>
          <td>{{ producto.fecha_agregado }}</td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="agregarProducto">
      <input type="text" v-model="nombre" placeholder="Nombre" required />
      <input type="text" v-model="descripcion" placeholder="Descripción" />
      <input type="number" v-model="costo" step="0.01" placeholder="Costo" required />
      <input type="number" v-model="precio" step="0.01" placeholder="Precio" required />
      <select v-model="categoria" required>
        <option value="" disabled selected>Categoría</option>
        <option value="Ropa">Ropa</option>
        <option value="Calzado">Calzado</option>
        <option value="Cosmeticos">Cosmeticos</option>
      </select>
      <input type="text" v-model="talla" placeholder="Talla" />
      <input type="text" v-model="color" placeholder="Color" />
      <input type="number" v-model="stock" placeholder="Stock" required />
      <button type="submit">Agregar Producto</button>
    </form>
  </div>
  <Clientes />
</template>
<script>
import axios from 'axios';

export default {
  name: 'Productos',
  data() {
    return {
      productos: [],
      nombre: '',
      descripcion: '',
      costo: '',
      precio: '',
      categoria: '',
      talla: '',
      color: '',
      stock: ''
    };
  },
  methods: {
    async fetchProductos() {
      try {
        const response = await axios.get('/api/productos');
        this.productos = response.data.data;
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    async agregarProducto() {
      const nuevoProducto = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        costo: this.costo,
        precio: this.precio,
        categoria: this.categoria,
        talla: this.talla,
        color: this.color,
        stock: this.stock
      };

      try {
        const response = await axios.post('/api/productos', nuevoProducto);
        this.nombre = '';
        this.descripcion = '';
        this.costo = '';
        this.precio = '';
        this.categoria = '';
        this.talla = '';
        this.color = '';
        this.stock = '';
      } catch (error) {
        console.error('Error al agregar producto:', error);
      }
      this.fetchProductos();
    }
  },
  mounted() {
    this.fetchProductos();
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

input, select, button {
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  grid-column: span 3;
}

button:hover {
  background-color: #45a049;
}
</style>