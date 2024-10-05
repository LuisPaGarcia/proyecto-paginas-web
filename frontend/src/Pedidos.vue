<template>
  <div class="container">
    <h1>Pedidos</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente ID</th>
          <th>Fecha Pedido</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.cliente_id }}</td>
          <td>{{ pedido.fecha_pedido }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Agregar Pedido</h2>
    <form @submit.prevent="agregarPedido">
      <select v-model="cliente_id" required>
        <option disabled value="">Seleccione un Cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre }}
        </option>
      </select>
      <button type="submit">Agregar Pedido</button>
    </form>

    <h2>Agregar Productos al Pedido</h2>
    <form @submit.prevent="agregarProductoAlPedido">
      <input type="number" v-model="pedido_id" placeholder="Pedido ID" required />
      <input type="number" v-model="producto_id" placeholder="Producto ID" required />
      <input type="number" v-model="cantidad" placeholder="Cantidad" required />
      <input type="number" v-model="precio" step="0.01" placeholder="Precio" required />
      <button type="submit">Agregar Producto al Pedido</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pedidos: [],
      clientes: [],
      cliente_id: '',
      pedido_id: '',
      producto_id: '',
      cantidad: '',
      precio: ''
    };
  },
  methods: {
    async fetchPedidos() {
      try {
        const response = await axios.get('/api/pedidos');
        this.pedidos = response.data.data;
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    },
    async fetchClientes() {
      try {
        const response = await axios.get('/api/obtener-clientes');
        this.clientes = response.data.data;
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    },
    async agregarPedido() {
      const nuevoPedido = {
        cliente_id: this.cliente_id
      };

      try {
        const response = await axios.post('/api/pedidos', nuevoPedido);
        this.cliente_id = '';
      } catch (error) {
        console.error('Error al agregar pedido:', error);
      }
      this.fetchClientes();
    },
    async agregarProductoAlPedido() {
      const nuevoPedidoProducto = {
        pedido_id: this.pedido_id,
        producto_id: this.producto_id,
        cantidad: this.cantidad,
        precio: this.precio
      };

      try {
        await axios.post('/api/pedido_productos', nuevoPedidoProducto);
        this.pedido_id = '';
        this.producto_id = '';
        this.cantidad = '';
        this.precio = '';
      } catch (error) {
        console.error('Error al agregar producto al pedido:', error);
      }
    }
  },
  mounted() {
    this.fetchPedidos();
    this.fetchClientes();
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

input,
select,
button {
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
