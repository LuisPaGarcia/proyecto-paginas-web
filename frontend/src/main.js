
import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
// Add the necessary CSS
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-vue-next/dist/bootstrap-vue-next.css";

const app = createApp(App);
app.use(router);
app.mount("#app");