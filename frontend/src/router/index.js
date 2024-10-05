import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '../components/Inicio.vue';
import Clientes from '../Clientes.vue';
import Productos from '../Productos.vue';
import Pedidos from '../Pedidos.vue';
const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/productos',
    name: 'Productos',
    component: Productos
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;