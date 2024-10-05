<template>
  <div class="container">
    <h1>Clientes</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Ciudad</th>
          <th>País</th>
          <th>Fecha de Registro</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>{{ cliente.ciudad }}</td>
          <td>{{ cliente.pais }}</td>
          <td>{{ cliente.fecha_registro }}</td>
          <td>{{ cliente.tipo }}</td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="agregarCliente">
      <input type="text" required v-model="nombre" placeholder="Nombre" />
      <input type="text" required v-model="apellido" placeholder="Apellido" />
      <input type="email" required v-model="email" placeholder="Email" />
      <input type="tel" required v-model="telefono" placeholder="Telefono" maxlength="8" pattern="\d{1,8}" />
      <input type="text" required v-model="direccion" placeholder="Direccion" />
      <select required v-model="ciudad">
        <option disabled value="">Seleccione una ciudad</option>
        <option value="Antigua">Antigua</option>
        <option value="Ciudad de Guatemala">Ciudad de Guatemala</option>
        <option value="Amatitlán">Amatitlán</option>
      </select>
      <select required v-model="pais">
        <option value="Guatemala">Guatemala</option>
      </select>
      <select required v-model="tipo">
        <option disabled value="">Seleccione un tipo</option>
        <option value="Mayorista">Mayorista</option>
        <option value="Minorista">Minorista</option>
      </select>
      <button type="submit">Agregar cliente</button>
    </form>
  </div>
</template>

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
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  /* max-width: 800px; */
  margin: 0 auto;
}

form button {
  grid-column: span 2;
}

input,
button,
select {
  padding: 10px;
  font-size: 16px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Clientes',
  data() {
    return {
      clientes: [],
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      pais: 'Guatemala',
      tipo: '',
    };
  },
  mounted() {
    this.fetchClientes();
  },
  methods: {
    async fetchClientes() {
      const response = await axios.get('/api/obtener-clientes');
      this.clientes = response.data.data;
    },
    async agregarCliente() {
      if (
        this.nombre.trim() &&
        this.apellido.trim() &&
        this.email.trim() &&
        this.telefono.trim() &&
        this.direccion.trim() &&
        this.ciudad.trim() &&
        this.pais.trim() &&
        this.tipo.trim()) {
        await axios.post('/api/agregar-cliente', {
          nombre: this.nombre.trim(),
          apellido: this.apellido.trim(),
          email: this.email.trim(),
          telefono: this.telefono.trim(),
          direccion: this.direccion.trim(),
          ciudad: this.ciudad.trim(),
          pais: this.pais.trim(),
          tipo: this.tipo.trim(),
        });
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.telefono = '';
        this.direccion = '';
        this.ciudad = '';
        this.pais = '';
        this.tipo = '';
        this.fetchClientes();
      }
    }
  }
};
</script>
