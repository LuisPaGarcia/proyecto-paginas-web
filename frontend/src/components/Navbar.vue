<template>
  <div class="navbar">
    <router-link class="navbar-brand" to="/">Navbar</router-link>
    <div class="navbar-nav">
      <span class="nav-item">
        <router-link class="nav-link" to="/productos">Productos</router-link>
      </span>
      <span class="nav-item">
        <router-link class="nav-link" to="/clientes">Clientes</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #17a2b8;
}

.navbar-brand {
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.nav-item {
  margin-left: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>