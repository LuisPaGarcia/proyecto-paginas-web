import { createRouter, createWebHistory } from 'vue-router';
import Inicio from '../components/Inicio.vue';
import Productos from '../Productos.vue';
import Clientes from '../Clientes.vue';
import RealizarPedido from '../Realizar-Pedido.vue';
import VistaCliente from '../Vista-Cliente.vue';
import VerPedidos from '../Ver-Pedidos.vue';

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
    path: '/pedido',
    name: 'Realizar Pedido',
    component: RealizarPedido
  },
  {
    path: '/vista-cliente',
    name: 'Vista Cliente',
    component: VistaCliente
  },
  {
    path: '/pedidos',
    name: 'Ver Pedidos',
    component: VerPedidos
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;