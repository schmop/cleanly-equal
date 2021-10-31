import { createApp } from 'vue';
import Cleanly from './Cleanly.vue';
import Equal from 'equal-vue';
import 'equal-vue/dist/style.css'
import {Client} from "@/Client";

const app = createApp(Cleanly);
app.use(Equal);
app.mount('#app');


declare global {
    interface Window { client: Client; }
}
window.client = new Client();
