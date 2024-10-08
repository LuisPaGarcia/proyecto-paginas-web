<template>
  <div class="container">
    <h1>Listado de Pedidos</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Total del Pedido</th>
          <th>Total de Productos</th>
          <th>Total Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr class="seleccionable" v-for="pedido in pedidos" :key="pedido.id" @click="verDetallePedido(pedido.id)" :class="{ 'selected-row': selectedPedidoId === pedido.id }">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.nombre }} {{ pedido.apellido }}</td>
          <td>{{ pedido.total | currency }}</td>
          <td>{{ pedido.total_productos }}</td>
          <td>{{ pedido.total_cantidad }}</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <!-- Mostrar el aviso si no hay pedido seleccionado aún -->
    <h2 v-if="!detallePedido.length" class="aviso">+ Haz click en un pedido para ver el detalle</h2>
    <!-- Mostrar el pedido si ya se seleccionó un pedido -->
    <h2 v-if="detallePedido.length">Pedido</h2>
    <table v-if="detallePedido.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Talla</th>
          <th>Color</th>
          <th>Stock</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in detallePedido" :key="producto.producto_id">
          <td>{{ producto.producto_id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.categoria }}</td>
          <td>{{ producto.talla }}</td>
          <td>{{ producto.color }}</td>
          <td>{{ producto.stock }}</td>
          <td>{{ producto.cantidad }}</td>
        </tr>
        <tr>
          <td colspan="8" style="text-align: right; font-weight: bold;">Total</td>
          <td colspan="2">{{ totalPedido }}</td>
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
      pedidos: [],
      detallePedido: [],
      selectedPedidoId: null,
      totalPedido: 0
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
    },
    async verDetallePedido(pedidoId) {
      try {
        const response = await axios.get(`/api/pedidos/${pedidoId}`);
        this.detallePedido = response.data.data;
        this.selectedPedidoId = pedidoId;
        this.actualizarTotalPedido();
      } catch (error) {
        console.error('Error al obtener el detalle del pedido:', error);
      }
    },
    actualizarTotalPedido() {
      this.totalPedido = this.detallePedido.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    },
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

.aviso {
  margin-top: 20px;
  color: lightgray;
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

tr.seleccionable:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.selected-row {
  background-color: #d1e7dd !important;
}
</style>