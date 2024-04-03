import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import './style.css'
import App from './App.vue'
import {routes} from "./routes/routes.js";

const app = createApp(App);
app.use(routes);
app.use(Notifications);
app.mount('#app');
