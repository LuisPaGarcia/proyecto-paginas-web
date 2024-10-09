<template>
  <div class="container">
    <h1>Realizar Pedido</h1>

    <div class="form-group">
      <label for="cliente">Seleccionar Cliente</label>
      <select v-model="selectedCliente" id="cliente" required>
        <option disabled value="">Selecciona un Cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre }} {{ cliente.apellido }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="buscarProducto">Buscar Producto</label>
      <input type="text" id="buscarProducto" v-model="buscarProducto"
        placeholder="Buscar por nombre, descripción o tipo" @input="buscarProductos" />
    </div>

    <table>
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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productosFiltrados" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.categoria }}</td>
          <td>{{ producto.talla }}</td>
          <td>{{ producto.color }}</td>
          <td>{{ producto.stock }}</td>
          <td><button @click="agregarAlPedido(producto)" :disabled="producto.stock <= 0">Agregar al pedido</button></td>
        </tr>
      </tbody>
    </table>

    <h2 v-if="pedido.length">Pedido</h2>
    <table v-if="pedido.length">
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
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in pedido" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.categoria }}</td>
          <td>{{ producto.talla }}</td>
          <td>{{ producto.color }}</td>
          <td>{{ producto.stock }}</td>
          <td>
            <input type="number" v-model.number="producto.cantidad" :min="1" :max="producto.stock"
              @input="validarCantidad(producto)" />
          </td>
          <td><button @click="removerDelPedido(producto)">Remover</button></td>
        </tr>
        <tr>
          <td colspan="8" style="text-align: right; font-weight: bold;">Total</td>
          <td colspan="2">{{ totalPedido }}</td>
        </tr>
      </tbody>
    </table>

    <button class="btn-confirmar-pedido" @click="confirmarPedido"
      :disabled="!pedido.length || !selectedCliente || pedido.some(producto => !producto.cantidad)">Confirmar
      Pedido</button>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      clientes: [],
      selectedCliente: '',
      buscarProducto: '',
      productos: [],
      productosFiltrados: [],
      pedido: [],
      totalPedido: 0,
    };
  },
  methods: {
    async fetchClientes() {
      try {
        const response = await axios.get('/api/obtener-clientes');
        this.clientes = response.data.data;
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    },
    async fetchProductos() {
      try {
        const response = await axios.get('/api/productos');
        this.productos = response.data.data;
        this.productosFiltrados = this.productos;
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    actualizarTotalPedido() {
      this.totalPedido = this.pedido.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    },
    buscarProductos() {
      const term = this.buscarProducto.toLowerCase();
      this.productosFiltrados = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(term) ||
        producto.descripcion.toLowerCase().includes(term) ||
        producto.categoria.toLowerCase().includes(term)
      );
    },
    agregarAlPedido(producto) {
      this.pedido.push({ ...producto, cantidad: 1 });
      this.productos = this.productos.filter(p => p.id !== producto.id);
      this.buscarProductos();
      this.actualizarTotalPedido();
    },
    removerDelPedido(producto) {
      this.productos.push(producto);
      this.pedido = this.pedido.filter(p => p.id !== producto.id);
      this.buscarProductos();
      this.actualizarTotalPedido();
    },
    validarCantidad(producto) {
      if (producto.cantidad === '') {
        producto.cantidad = '';
        return
      }

      if (producto.cantidad < 1) {
        producto.cantidad = 1;
      } else if (producto.cantidad > producto.stock) {
        producto.cantidad = producto.stock;
      }
      this.actualizarTotalPedido();
    },
    async confirmarPedido() {
      try {
        // Crear un nuevo pedido
        const pedidoResponse = await axios.post('/api/pedidos', {
          cliente_id: this.selectedCliente,
          estado_pedido: 'pendiente',
        });
        const pedidoId = pedidoResponse.data.id;

        // Agregar productos al pedido
        for (const producto of this.pedido) {
          await axios.post('/api/pedido_productos', {
            pedido_id: pedidoId,
            producto_id: producto.id,
            cantidad: producto.cantidad,
            precio: producto.precio
          });

          // Actualizar el stock del producto
          const nuevoStock = producto.stock - producto.cantidad;
          await axios.put(`/api/productos/${producto.id}`, {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            costo: producto.costo,
            precio: producto.precio,
            categoria: producto.categoria,
            talla: producto.talla,
            color: producto.color,
            stock: nuevoStock
          });
        }

        // Limpiar el pedido y mostrar un mensaje de éxito
        this.pedido = [];
        this.selectedCliente = '';
        alert('Pedido confirmado con éxito');
      } catch (error) {
        console.error('Error al confirmar el pedido:', error);
        alert('Hubo un error al confirmar el pedido');
      }
      this.fetchClientes();
      this.fetchProductos();
    }
  },
  mounted() {
    this.fetchClientes();
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

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
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

button {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}
</style>