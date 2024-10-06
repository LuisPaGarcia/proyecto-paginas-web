<template>
  <div class="container">
    <h1>Listado de Pedidos</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Total del Pedido</th>
          <th>Total de Productos Diferentes</th>
          <th>Suma de Productos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.nombre }} {{ pedido.apellido }}</td>
          <td>{{ pedido.total | currency }}</td>
          <td>{{ pedido.total_productos }}</td>
          <td>{{ pedido.total_cantidad }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pedidos: []
    };
  },
  methods: {
    async fetchPedidos() {
      try {
        const response = await axios.get('/api/ver-pedidos');
        this.pedidos = response.data.data;
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    }
  },
  mounted() {
    this.fetchPedidos();
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
  margin-top: 20px;
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
</style>