import { createRouter, createWebHistory } from 'vue-router';
import Clientes from '../Clientes.vue';
import Productos from '../Productos.vue';
const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;