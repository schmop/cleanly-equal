import { createApp } from 'vue';
import Cleanly from './Cleanly.vue';
import Equal from 'equal-vue';
import 'equal-vue/dist/style.css'
import {Client} from "@/Client";

declare global {
    interface Window { client: Client; }
}

(async () => {
    window.client = new Client();
    await window.client.restoreState();

    const app = createApp(Cleanly);
    app.use(Equal);
    app.mount('#app');
})();